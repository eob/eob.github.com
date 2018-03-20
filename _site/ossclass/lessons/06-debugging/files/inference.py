###############################################################################
# 6.S194 Debugging Exercise
#
# "Inference, Dr. Watson"
#
# This exercise is about Viterbi Decoding, a powerful dynamic programming
# used in a wide range of applications from medical diagnosis to natural language
# processing.
#
# But the stock algorithm, taken from Wikipedia, has a serious flaw.
# If you run this program as-is, you should be able to tell, from its output
# what it is.
#
# Your task, should you choose to accept it:
# * Figure out what this flaw is
# * Figure out why it is happening
# * If this were a medical program, what would this flaw mean?
# * Figure out a way to prevent erroneous output
# * Figure out a way to fix the flaw to begin with

########################################
# BEGIN CODE FROM WIKIPEDIA
# http://en.wikipedia.org/wiki/Viterbi_algorithm
########################################

states = ('Healthy', 'Fever')

start_probability = {'Healthy': 0.6,
                       'Fever': 0.4
}
 
transition_probability = {
 'Healthy' : { 'Healthy': 0.7,
                 'Fever': 0.3},
 'Fever' : {   'Healthy': 0.4,
                 'Fever': 0.6},
}
 
emission_probability = {
 'Healthy' : {'normal': 0.5,
                'cold': 0.4,
               'dizzy': 0.1},
 'Fever' : {  'normal': 0.1,
                'cold': 0.3,
               'dizzy': 0.6},
}

# Helps visualize the steps of Viterbi.
def print_dptable(V):
  print "    ",
  for i in range(len(V)): print "%7d" % i,
  print
 
  for y in V[0].keys():
    print "%.5s: " % y,
    for t in range(len(V)):
      print "%.7s" % ("%f" % V[t][y]),
      print
 
def viterbi(obs, states, start_p, trans_p, emit_p):
  V = [{}]
  path = {}
 
  # Initialize base cases (t == 0)
  for y in states:
    V[0][y] = start_p[y] * emit_p[y][obs[0]]
    path[y] = [y]
 
  # Run Viterbi for t > 0
  for t in range(1,len(obs)):
    V.append({})
    newpath = {}

    for y in states:
      (prob, state) = max([(V[t-1][y0] * trans_p[y0][y] * emit_p[y][obs[t]], y0) for y0 in states])
      V[t][y] = prob
      newpath[y] = path[state] + [y]

    # Don't need to remember the old paths
    path = newpath
 
  (prob, state) = max([(V[len(obs) - 1][y], y) for y in states])
  return (prob, path[state])


########################################
# END CODE FROM WIKIPEDIA
# http://en.wikipedia.org/wiki/Viterbi_algorithm
########################################

# Example 1:
#   Monday, Wednesday, and Tuesday

def PrintMostLikelyStatesFor(name, obs):
  o = tuple(obs)
  vit = viterbi(o, states, start_probability, transition_probability, emission_probability)
  print "After a %s, you'll be %s (p = %.4g)" % (name, vit[1][-1], vit[0])

one_week = ['normal', 'normal', 'normal', 'cold', 'dizzy', 'dizzy', 'normal']
PrintMostLikelyStatesFor("Week", one_week)

one_month = one_week * 4
PrintMostLikelyStatesFor("Month", one_month)

one_year = one_week * 52
PrintMostLikelyStatesFor("Year", one_year)

one_year = one_year * 10 
PrintMostLikelyStatesFor("Decade", one_year)

