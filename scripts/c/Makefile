.PHONY: clean

main.out: stack.o unionfind.o utils.o
	gcc -o run.out main.c stack.o unionfind.o utils.o
unionfind.o: unionfind.c unionfind.h
	gcc -c unionfind.c unionfind.h
stack.o: stack.c stack.h
	gcc -c stack.c stack.h
utils.o: utils.c utils.h
	gcc -c utils.c utils.h
clean:
	rm *.out *.o *.h.gch