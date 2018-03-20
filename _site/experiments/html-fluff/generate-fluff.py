from names import namelist 
from titles import titlelist
from words import wordlist
from bodies import bodylist
from random import choice
from BeautifulSoup import BeautifulSoup

# Generates a sequence of blog posts, expressed as HTML, which take the the
# following form (shown at fluff_level=0):
#
#   <div class="posts">
#     <div class="post">
#       <div class="header">
#         <h2 class="title">Bat Boy Spotted in a Boston-area Suburb!</h2>
#         By: <span class="byline">Rutabega Daikon</span>
#       </div>
#       <div class="body">Lorem ipsum dolor sit amet</div>
#       <div class="footer">
#       Tags:
#         <li>
#           <ul>world events</ul>
#           <ul>breaking</ul>
#         </li>
#       </div>
#     </div>
#   </div>
#
# Please forgive the procedural nature of the code below. This isn't meant
# to win any software development awards.

def pick_no_replacement(fromList):
  item = choice(fromList)
  fromList.remove(item)
  return item

def pick_word():
  return pick_no_replacement(wordlist)

def pick_title():
  return pick_no_replacement(titlelist)

def pick_name():
  return pick_no_replacement(namelist)

def pick_body():
  return pick_no_replacement(bodylist)

def generate_element(tag,
                     content=None,
                     classes=None,
                     autocontent=False,
                     autoclass=False,
                     fluff_level=0):
  if autocontent == 'word':
    content = pick_word()
  elif autocontent == 'post':
    content = pick_body()
  if autoclass:
    classes = [pick_word()]
  return "<%s class=\"%s\">%s</%s>" % (
      tag, " ".join(classes), content, tag)

def generate_tags(fluff_level=0):
  ul1 = generate_element(
      'ul', autoclass=True, autocontent='word', fluff_level=fluff_level)
  ul2 = generate_element(
      'ul', autoclass=True, autocontent='word', fluff_level=fluff_level)
  uls = ul1 + ul2
  li = generate_element(
      'li', autoclass=True, content=uls, fluff_level=fluff_level)
  return "Tags: \n" + li

def generate_footer(fluff_level):
  tags = generate_tags(fluff_level)
  return generate_element(
      'div', classes=['footer'], content=tags, fluff_level=fluff_level)

def generate_header(fluff_level):
  title = generate_element(
      'h2', classes=['title'], content=pick_title(), fluff_level=fluff_level)
  byline = "By: " + generate_element(
      'span', classes=['byline'], content=pick_name(), fluff_level=fluff_level)
  header = generate_element(
      'div', classes=['header'], content=(title+byline), fluff_level=fluff_level)
  return header

def generate_body(fluff_level):
  body = generate_element(
      'div', classes=['body'], content=pick_body(), fluff_level=fluff_level)
  return body

def generate_post(fluff_level):
  header = generate_header(fluff_level)
  body = generate_body(fluff_level)
  footer = generate_footer(fluff_level)
  content = header + body + footer
  post = generate_element(
      'div', classes=['post'], content=content, fluff_level=fluff_level)
  return post

def generate_blog(fluff_level, number_posts):
  posts = ""
  for i in range(number_posts):
    posts += generate_post(fluff_level)
  blog = generate_element(
      'div', classes=['posts'], content=posts, fluff_level=fluff_level)
  soup = BeautifulSoup(blog)
  return soup.prettify()

print generate_blog(0, 1)
