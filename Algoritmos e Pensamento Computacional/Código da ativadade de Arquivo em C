#include <stdio.h>

void bubbleSort(int arr[], int n)
{
    int i, j, temp;
    for (i = 0; i < n - 1; i++)
    {
        for (j = 0; j < n - i - 1; j++)
        {
            if (arr[j] > arr[j + 1])
            {
                // Troca os elementos
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
            }
        }
    }
}

int main()
{
    FILE *myFile;
    myFile = fopen("test.txt", "r");
    int bufferSize = 0;
    int storage;

    if (myFile == NULL)
    {
        printf("The File is NULL!");
        return -1;
    }
    
    while (fscanf(myFile, "%d,", &storage) != EOF)
    {
        printf("%d \n", storage);
        bufferSize += 1;
    }
    
    printf("bufferSize is %d \n", bufferSize);

    int arrayNumbers[bufferSize];
    rewind(myFile);

    for (int i = 0; i < bufferSize; i++)
    {
        fscanf(myFile, "%d,", &storage);
        arrayNumbers[i] = storage;
    }

    for (int i = 0; i < bufferSize; i++)
    {
        printf("%d | \n", arrayNumbers[i]);
    }

    int NumberLoop = sizeof(arrayNumbers) / sizeof(arrayNumbers[0]);
    bubbleSort(arrayNumbers, NumberLoop);

    printf("Sorted Array \n");
    for (int i = 0; i < bufferSize; i++) {
        printf("%d \n", arrayNumbers[i]);
    }

    printf("\n");
    fclose(myFile);
    return 0;
}
