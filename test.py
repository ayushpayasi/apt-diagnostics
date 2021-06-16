# check = [[1,4],[2,6],[1,6]]
# operations = 

def endGame(operations):
    maxValue = max(map(max, operations))
    li=[False for i in range(maxValue+1)]
    for i in operations:
        for j in range(i[0]-1,i[1]):
            li[j] = not li[j]
    
    total = 0
    for i in range(len(li)):
        if li[i] :
            total += i+1

    return total
