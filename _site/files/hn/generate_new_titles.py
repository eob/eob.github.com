# Run this after running extract_titles.py

import random

stop_words = ["a","able","about","above","abst","accordance","according","accordingly","across","act","actually","added","adj","adopted","affected","affecting","affects","after","afterwards","again","against","ah","all","almost","alone","along","already","also","although","always","am","among","amongst","an","and","announce","another","any","anybody","anyhow","anymore","anyone","anything","anyway","anyways","anywhere","apparently","approximately","are","aren","arent","arise","around","as","aside","ask","asking","at","auth","available","away","awfully","b","back","be","became","because","become","becomes","becoming","been","before","beforehand","begin","beginning","beginnings","begins","behind","being","believe","below","beside","besides","between","beyond","biol","both","brief","briefly","but","by","c","ca","came","can","cannot","cant","cause","causes","certain","certainly","co","com","come","comes","contain","containing","contains","could","couldnt","d","date","did","didnt","different","do","does","doesnt","doing","done","dont","down","downwards","due","during","e","each","ed","edu","effect","eg","eight","eighty","either","else","elsewhere","end","ending","enough","especially","et","et-al","etc","even","ever","every","everybody","everyone","everything","everywhere","ex","except","f","far","few","ff","fifth","first","five","fix","followed","following","follows","for","former","formerly","forth","found","four","from","further","furthermore","g","gave","get","gets","getting","give","given","gives","giving","go","goes","gone","got","gotten","h","had","happens","hardly","has","hasnt","have","havent","having","he","hed","hence","her","here","hereafter","hereby","herein","heres","hereupon","hers","herself","hes","hi","hid","him","himself","his","hither","home","how","howbeit","however","hundred","i","id","ie","if","i'll","im","immediate","immediately","importance","important","in","inc","indeed","index","information","instead","into","invention","inward","is","isnt","it","itd","it'll","its","itself","i've","j","just","k","keep","keeps","kept","keys","kg","km","know","known","knows","l","largely","last","lately","later","latter","latterly","least","less","lest","let","lets","like","liked","likely","line","little","'ll","look","looking","looks","ltd","m","made","mainly","make","makes","many","may","maybe","me","mean","means","meantime","meanwhile","merely","mg","might","million","miss","ml","more","moreover","most","mostly","mr","mrs","much","mug","must","my","myself","n","na","name","namely","nay","nd","near","nearly","necessarily","necessary","need","needs","neither","never","nevertheless","new","next","nine","ninety","no","nobody","non","none","nonetheless","noone","nor","normally","nos","not","noted","nothing","now","nowhere","o","obtain","obtained","obviously","of","off","often","oh","ok","okay","old","omitted","on","once","one","ones","only","onto","or","ord","other","others","otherwise","ought","our","ours","ourselves","out","outside","over","overall","owing","own","p","page","pages","part","particular","particularly","past","per","perhaps","placed","please","plus","poorly","possible","possibly","potentially","pp","predominantly","present","previously","primarily","probably","promptly","proud","provides","put","q","que","quickly","quite","qv","r","ran","rather","rd","re","readily","really","recent","recently","ref","refs","regarding","regardless","regards","related","relatively","research","respectively","resulted","resulting","results","right","run","s","said","same","saw","say","saying","says","sec","section","see","seeing","seem","seemed","seeming","seems","seen","self","selves","sent","seven","several","shall","she","shed","she'll","shes","should","shouldnt","show","showed","shown","showns","shows","significant","significantly","similar","similarly","since","six","slightly","so","some","somebody","somehow","someone","somethan","something","sometime","sometimes","somewhat","somewhere","soon","sorry","specifically","specified","specify","specifying","state","states","still","stop","strongly","sub","substantially","successfully","such","sufficiently","suggest","sup","sure","t","take","taken","taking","tell","tends","th","than","thank","thanks","thanx","that","that'll","thats","that've","the","their","theirs","them","themselves","then","thence","there","thereafter","thereby","thered","therefore","therein","there'll","thereof","therere","theres","thereto","thereupon","there've","these","they","theyd","they'll","theyre","they've","think","this","those","thou","though","thoughh","thousand","throug","through","throughout","thru","thus","til","tip","to","together","too","took","toward","towards","tried","tries","truly","try","trying","ts","twice","two","u","un","under","unfortunately","unless","unlike","unlikely","until","unto","up","upon","ups","us","use","used","useful","usefully","usefulness","uses","using","usually","v","value","various","'ve","very","via","viz","vol","vols","vs","w","want","wants","was","wasnt","way","we","wed","welcome","we'll","went","were","werent","we've","what","whatever","what'll","whats","when","whence","whenever","where","whereafter","whereas","whereby","wherein","wheres","whereupon","wherever","whether","which","while","whim","whither","who","whod","whoever","whole","who'll","whom","whomever","whos","whose","why","widely","willing","wish","with","within","without","wont","words","world","would","wouldnt","www","x","y","yes","yet","you","youd","you'll","your","youre","yours","yourself","yourselves","you've","z","zero"]
START = "SSSSSTART".lower()
END = "EEEEEEND".lower()

f = open('titles.csv')
unigrams = {}
bigrams = {}
trigrams = {}

for line in f:
    prev_prev_word = START
    prev_word = START
    line = line.rstrip()
    line = line.split()
    line.append(END)

    for word in line:
        word = word.lower()
        if word in unigrams:
            unigrams[word] += 1
        else:
            unigrams[word] = 1
        
        if prev_word not in bigrams:
            bigrams[prev_word] = {}
        dic = bigrams[prev_word]
        if word in dic:
            dic[word] += 1
        else:
            dic[word] = 1        
            
        if prev_prev_word != START:
            if prev_prev_word not in trigrams:
                trigrams[prev_prev_word] = {}
            if prev_word not in trigrams[prev_prev_word]:
                trigrams[prev_prev_word][prev_word] = {}
            dic = trigrams[prev_prev_word][prev_word]
            if word in dic:
                dic[word] += 1
            else:
                dic[word] = 1        
            
        prev_prev_word = prev_word
        prev_word = word
        
f.close()

def add(x,y): return x+y

uni_total = reduce(add, unigrams.values())

def pick(dic, rand):
    i=0
    for k, v in dic.items():
       i += v
       if i>= rand:
           return k
    return None
    

def rand_uni():
    rand = random.randint(0,uni_total)
    return pick(unigrams, rand)
    
def rand_bi(start):
    if start == None:
        return rand_uni()
    
    if start not in bigrams:
        return rand_uni()
    
    dic = bigrams[start]
    dic_total = reduce(add, dic.values())
    rand = random.randint(0, dic_total)
    return pick(dic, rand)            

def rand_tri(one, two):
    if one not in trigrams:
        if one not in bigrams:
            return rand_uni()
        else:
            return rand_bi(one)
    else:
        dic = trigrams[one]
        if two not in dic:
            if one not in bigrams:
                return rand_uni()
            else:
                return rand_bi(one)
        else:
            dic2 = dic[two]
            total = reduce(add, dic2.values())
            rand = random.randint(0, total)
            return pick(dic2, rand)

def pick_next_word(sent):
    if len(sent) == 0:
        return rand_bi(START)
        
    last_word = sent[len(sent) -1]
    # Poor man's way to prevent us from just parroting the training data
    if last_word in stop_words:
        return rand_bi(last_word)
        
    if len(sent) > 1:
        return rand_tri(sent[len(sent)-2], sent[len(sent)-1])
    elif len(sent) > 0:
        return rand_bi(sent[len(sent)-1])
    else:
        return rand_bi(START)

def rand_sent():
    sent = []
    next = pick_next_word(sent)
    while next != END:
        sent.append(next)
        next = pick_next_word(sent)
    return sent
    
print "Generating random sentences..."
for i in range(1,30):
    try:
        s =  " ".join(rand_sent()) + '\n'
        print s
    except:
        # Anything with unicode is going to end up here.
        # I don't know python, so I don't know how to prevent this.
        pass

