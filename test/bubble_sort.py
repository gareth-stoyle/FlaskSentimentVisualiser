import timeit


def bubble_sort(arr):
    sorted = True
    for i in range(len(arr)-1):
        for j in range(len(arr)-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]
                sorted = False
        if sorted == True:
            return arr
    return arr



start = timeit.default_timer()
arr1 = [2, 5, 1, 3, 4]
bubble_sort(arr1)
# print(arr1)
stop = timeit.default_timer()

# print('Time: ', stop - start)  