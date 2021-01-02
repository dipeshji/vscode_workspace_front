#include<stdio.h>


int main(int argc, char *argv[]){
    printf("%d", argc);
    if(argc>=2){
        for(int i=1; i<argc; i++){
            printf("\n%s", argv[i]);
            printf("\n");
        }
    }
    else
    {
        printf("Empty");
    }
return 0;
}


