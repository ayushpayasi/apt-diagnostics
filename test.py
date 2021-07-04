def solve(locations, length):
	temp = [0] * length
	for i in range(length):
	    temp[i]=-1
	for i in range(length):
		leftInd = max(i - locations[i], 0)
		rightInd = min(i + (locations[i] + 1), length)
		temp[leftInd] = max(temp[leftInd],rightInd)
	ans = 1

	rightInd = temp[0]
	nextInd = 0
	for i in range(length):
		nextInd = max(nextInd,temp[i])
		if (i == rightInd):
			ans += 1
			rightInd = nextInd
	return ans

if __name__ == '__main__':

	locations = [2,0,0,0]
	length = len(locations)

	print(solve(locations, length))
