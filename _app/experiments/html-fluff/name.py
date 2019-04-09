from itertools import izip

f1 = open('first_names_shuf.txt')
f2 = open('last_names_shuf.txt')
g = open('full_names.txt', 'w')
i = 0

firsts = []
lasts = []

for l in f1:
  if i < 400:
    name = l.strip()
    name = name[0].upper() + name[1:]
    firsts.append(name)
    i += 1

i = 0
for l in f2:
  if i < 400:
    name = l.strip()
    name = name[0].upper() + name[1:]
    lasts.append(name)
    i += 1

for first, last in izip(firsts, lasts):
  name = "%s %s" % (first, last)
  g.write(name + "\n")

f1.close()
f2.close()
g.close()



