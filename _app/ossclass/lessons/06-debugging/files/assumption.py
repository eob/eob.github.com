###############################################################################
# 6.S194 Debugging Exercise
#
# "You know what they say about assumptions..."
#
# Your task:
#   Run the program. Something is obviously wrong.
#   Rigure out what it is.

# CSV file of students who applied to MIT.
NAMES   = """ID,   FIRST,   LAST
             int,  string,  string
             1,    Suzie,   Smarts
             4,    Mary,    Einstein
             3,    Bobby,   Lazyface
             2,    Jonnie,  Bookworm
             6,    Sammy,   Sleepsallday"""

# CSV file of blind reviews of each student.
REVIEWS = """ID,  GPA,   AP_TESTS,  ESSAY_SCORE,  EXTRAS
             int, float, int,       int,          int
             1,   3.7,   4,         5,            4
             4,   4.0,   5,         5,            5
             3,   2.0,   0,         3,            1
             2,   4.0,   2,         4,            4
             6,   3.2,   3,         4,            5"""


# Convenience function to load a CSV row into a Python dictionary.
# If you're just starting out, it builds you a new dictionary (into_object).
# If you're adding to an existing dictionary, pass it in instead and
# it will use that. That mechanism allows you to join multiple tables.
def BuildStudent(header, schema, row, into_object = None):
  if into_object is None:
    into_object = {}
  assert(len(header) == len(schema))
  assert(len(schema) == len(row))
  
  for i in range(len(header)):
    parser = None

    if schema[i] == "int":
      parser = int
    elif schema[i] == "float":
      parser = float
    else:
      parser = str

    try:
      into_object[header[i]] = parser(row[i])
    except:
      print "Couldn't parse: %s" % row[i]

  return into_object

def LoadRows(csv):
  rows = csv.split("\n")
  fixed = []
  for row in rows:
    row = row.split(",")
    row = [x.strip() for x in row]
    fixed.append(row)
  return (fixed[0], fixed[1], fixed[2:])

def LoadStudents():
  (nameHeader, nameSchema, names)     = LoadRows(NAMES)
  (reviewHeader, reviewSchema, reviews) = LoadRows(REVIEWS)

  students = {}

  # We'll take advantage that we know the first column is the ID.
  # This isn't good practice, but simplifies the exercise code.

  # Load the initial set of students from the review table
  for row in reviews:
    sid = row[0]
    student = BuildStudent(reviewHeader, reviewSchema, row)
    students[sid] = student

  # Join with the names.
  for row in names:
    sid = row[0]
    BuildStudent(nameHeader, nameSchema, row, students[sid])
  
  return students
  
def AdmitStudents():
  print "MIT Admission Letter Mailer"
  students = LoadStudents()
  print students
  for sid in students:
    student = students[sid]
    if "GPA" in student and student["GPA"] > 3.9:
      decision = "ADMITTED"
    else:
      decision = "Not Admitted"
    
    print "* %s %s %s with GPA %2.1f" % (
      student["FIRST"], student["LAST"], decision, student["GPA"])

AdmitStudents()
