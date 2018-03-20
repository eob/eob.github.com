# trends.csv is the CSV file with the HN front page data

f = open('trends.csv')
titles = open('titles.csv', 'w')

seen = {}
for line in f:
    l = line.replace('&quot;', '')
    a = l.split(',')
    if (len(a) >2):
        if a[2] not in seen:
            seen[a[2]] = 1
            titles.write(a[2] + '\n')
titles.close()

