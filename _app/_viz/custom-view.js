/**
 * @fileOverview An adapter to indirect Exhibit's data operations with a Custom view.
 * @author Ted Benson <eob@csail.mit.edu>
 */

/**
 * @constructor
 * @class
 * @param {Element} containerElement
 * @param {Exhibit.UIContext} uiContext
 */ 
Exhibit.CustomView = function(containerElmt, uiContext) {
    var view = this;
    $.extend(this, new Exhibit.View(
        "Custom",
        containerElmt,
        uiContext
    ));
    this.addSettingSpecs(Exhibit.CustomView._settingSpecs);

    this._onItemsChanged = function() {
        // @@@this will ignore the stored state, which is odd
        // it should probably replace the state after doing this - 
        // or forget it since this will always ignore the stored state,
        // correctly
        view._orderedViewFrame._settings.page = 0;
        view._reconstruct();
    };
    $(uiContext.getCollection().getElement()).bind(
        "onItemsChanged.exhibit",
        view._onItemsChanged
    );

    this._orderedViewFrame = new Exhibit.OrderedViewFrame(uiContext);
    this._orderedViewFrame.parentReconstruct = function() {
        view._reconstruct();
    };
    this._orderedViewFrame.parentHistoryAction = function(child, state, title) {
        Exhibit.History.pushComponentState(
            view,
            Exhibit.View.getRegistryKey(),
            view.exportState(view.makeStateWithSub(child, state)),
            title,
            true
        );
    };
    this.register();
};

/**
 * @constant
 */
Exhibit.CustomView._settingSpecs = { };

/**
 * @param {Object} configuration
 * @param {Element} containerElmt
 * @param {Exhibit.UIContext} uiContext
 * @returns {Exhibit.CustomView}
 */
Exhibit.CustomView.create = function(configuration, containerElmt, uiContext) {
    var view = new Exhibit.CustomView(
        containerElmt,
        Exhibit.UIContext.create(configuration, uiContext)
    );
    
    Exhibit.SettingsUtilities.collectSettings(
        configuration, view.getSettingSpecs(), view._settings);
        
    view._orderedViewFrame.configure(configuration);

    view._initializeUI();
    return view;
};

/**
 * @param {Element} configElmt
 * @param {Element} containerElmt
 * @param {Exhibit.UIContext} uiContext
 * @returns {Exhibit.CustomView}
 */
Exhibit.CustomView.createFromDOM = function(configElmt, containerElmt, uiContext) {
    var configuration, view;
    configuration = Exhibit.getConfigurationFromDOM(configElmt);
    view = new Exhibit.CustomView(
        typeof containerElmt !== "undefined" && containerElmt !== null ?
            containerElmt :
            configElmt,
        Exhibit.UIContext.createFromDOM(configElmt, uiContext)
    );
    
    Exhibit.SettingsUtilities.collectSettingsFromDOM(
        configElmt, view.getSettingSpecs(), view._settings);
    Exhibit.SettingsUtilities.collectSettings(
        configuration, view.getSettingSpecs(), view._settings);
    
    view._orderedViewFrame.configureFromDOM(configElmt);
    view._orderedViewFrame.configure(configuration);
    view._initializeUI();
    return view;
};

/**
 *
 */
Exhibit.CustomView.prototype.dispose = function() {
    var view = this;
    $(this.getUIContext().getCollection().getElement()).unbind(
        "onItemsChanged.exhibit",
        view._onItemsChanged
    );

    this._orderedViewFrame.dispose();
    this._orderedViewFrame = null;
    this._dom = null;

    this._dispose();
};

/**
 *
 */
Exhibit.CustomView.prototype._initializeUI = function() {
    var self, template;

    self = this;
    
    $(this.getContainer()).empty();
    self._initializeViewUI(function() {
        return $(self._dom.bodyDiv).html();
    });

    template = {
        elmt: this.getContainer(),
        children: [
            {   tag: "div",
                field: "headerDiv"
            },
            {   tag: "div",
                "class": "exhibit-collectionView-body",
                field: "bodyDiv"
            },
            {   tag: "div",
                field: "footerDiv"
            }
        ]
    };
    this._dom = $.simileDOM("template", template);
    this._orderedViewFrame._divHeader = this._dom.headerDiv;
    this._orderedViewFrame._divFooter = this._dom.footerDiv;
    this._orderedViewFrame.initializeUI();

    Exhibit.View.addViewState(
        this.getID(),
        this.exportState()
    );

    this._reconstruct();
};

/**
 *
 */
Exhibit.CustomView.prototype._reconstruct = function() {
    var view, state, closeGroups, i;
    view = this;
    state = {
        div:            this._dom.bodyDiv,
        contents:       null,
        groupDoms:      [],
        groupCounts:    []
    };

    closeGroups = function(groupLevel) {
        for (i = groupLevel; i < state.groupDoms.length; i++) {
            $(state.groupDoms[i].countSpan).html(state.groupCounts[i]);
        }
        state.groupDoms = state.groupDoms.slice(0, groupLevel);
        state.groupCounts = state.groupCounts.slice(0, groupLevel);

        if (groupLevel > 0) {
            state.div = state.groupDoms[groupLevel - 1].contentDiv;
        } else {
            state.div = view._dom.bodyDiv;
        }
        state.contents = null;
    };

    this._orderedViewFrame.onNewGroup = function(groupSortKey, keyType, groupLevel) {
        closeGroups(groupLevel);

        var groupDom = Exhibit.CustomView.constructGroup(groupLevel, groupSortKey);

        $(state.div).append(groupDom.elmt);
        state.div = groupDom.contentDiv;

        state.groupDoms.push(groupDom);
        state.groupCounts.push(0);
    };

    this._orderedViewFrame.onNewItem = function(itemID, index) {
        var i, itemLensItem, itemLens;
        if (typeof state.contents === "undefined" || state.contents === null) {
            state.contents = Exhibit.CustomView.constructList();
            $(state.div).append(state.contents);
        }

        for (i = 0; i < state.groupCounts.length; i++) {
            state.groupCounts[i]++;
        }

        itemLensItem = $("<li>");
        itemLens = view.getUIContext().getLensRegistry().createLens(itemID, itemLensItem, view.getUIContext());
        state.contents.append(itemLensItem);
    };

    $(this.getContainer()).hide();

    $(this._dom.bodyDiv).empty();
    this._orderedViewFrame.reconstruct();
    closeGroups(0);

    $(this.getContainer()).show();
};

/**
 * @returns {Object}
 */
Exhibit.CustomView.prototype.makeState = function() {
    return {};
};

/**
 * @param {String} sub
 * @param {Object} state
 * @returns {Object}
 */
Exhibit.CustomView.prototype.makeStateWithSub = function(sub, state) {
    var original;
    original = this.makeState();
    original[sub] = state;
    return original;
};

/**
 * @param {Object} state
 * @returns {Object}
 */
Exhibit.CustomView.prototype.exportState = function(state) {
    if (typeof state === "undefined" || state === null) {
        return this.makeStateWithSub(this._orderedViewFrame._historyKey,
                                     this._orderedViewFrame.exportState());
    } else {
        return state;
    }
};

/**
 * @param {Object} state
 * @param {Object} state.orderedViewFrame
 */
Exhibit.CustomView.prototype.importState = function(state) {
    if (this._orderedViewFrame !== null && this.stateDiffers(state)) {
        this._orderedViewFrame.importState(state.orderedViewFrame);
    }
};

/**
 * @param {Object} state
 * @param {Object} state.orderedViewFrame
 * @returns {Boolean}
 */
Exhibit.CustomView.prototype.stateDiffers = function(state) {
    if (typeof state.orderedViewFrame !== "undefined") {
        return this._orderedViewFrame.stateDiffers(state.orderedViewFrame);
    } else {
        return false;
    }
};

/**
 * @static
 * @param {Number} groupLevel
 * @param {String} label
 * @returns {Element}
 */
Exhibit.CustomView.constructGroup = function(groupLevel, label) {
    var template = {
        tag: "div",
        "class": "exhibit-collectionView-group",
        children: [
            {   tag: "h" + (groupLevel + 1),
                children: [
                    label,
                    {   tag:        "span",
                        "class":  "exhibit-collectionView-group-count",
                        children: [
                            " (",
                            {   tag: "span",
                                field: "countSpan"
                            },
                            ")"
                        ]
                    }
                ],
                field: "header"
            },
            {   tag: "div",
                "class": "exhibit-collectionView-group-content",
                field: "contentDiv"
            }
        ]
    };
    return $.simileDOM("template", template);
};

/**
 * @returns {jQuery}
 */
Exhibit.CustomView.constructList = function() {
    return $("<ol>").addClass("exhibit-customView-body");
};
