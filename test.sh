FILE=$1 #command line argument
DIRECTORY="courses"

ME=13
CE=10
EE=12
CS=11


if [ -f "$FILE" ]; then
    echo "$FILE exists."
    
    #check for courses directory
    if [ ! -d "$DIRECTORY" ]  #check if courses directory exist
    then
        echo "creating $DIRECTORY directory"
        mkdir ./$DIRECTORY
        echo "$DIRECTORY directory has been created" 
    fi

    #read input file
    while IFS=, read -r rollNo branch marks
    do
        # echo "$rollNo, $branch, $marks"
        if [ ! -f "$DIRECTORY/$branch.csv" ] #check if file exist with branch name
        then
            touch ./$DIRECTORY/$branch.csv #create file if dosen't exist
            echo "$rollNo, $marks" >> $DIRECTORY/$branch.csv
        else
            echo "$rollNo, $marks" >> $DIRECTORY/$branch.csv
            branchCode="${rollNo:0:2}"
            # if [ $branchCode == 13 ]
            # then
            #     echo "$branchCode ME"
            # elif [ $branchCode == 12 ]
            # then
            #     echo "$branchCode EE"
            # elif [ $branchCode == 11 ]
            # then
            #     echo "$branchCode CS"
            # else
            #     echo "$branchCode CE"
            # fi
            case "$branchCode" in
                "10") echo "CS"
                ;;
                "11") echo "EE"
                ;;
            esac
            
        fi
    done < $FILE
else 
    echo "$FILE does not exist." #Error, file does not exist
fi
