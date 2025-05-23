echo "Enter Number of terms" 
read n
a=0
b=1
for (( i=0; i<n; i++ ))
    do 
    echo $a
    c=$((a+b))
    a=$b
    b=$c
    done
