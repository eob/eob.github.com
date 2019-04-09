import os,sys
import json

print "IN: %s, OUT: %s" % (sys.argv[1], sys.argv[2])

inf = open(sys.argv[1])
outf = open(sys.argv[2], "w")

data = json.load(inf)

items = data["items"]



matrices = ['q0013', 'q0015', 'q0014', 'q0011', 'q0031', 'q0033', 'q0032', 'q0024']
for row in items:
  for m in matrices:
    del row[m]

json.dump(data, outf)
outf.close()

