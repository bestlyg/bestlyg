OUTPUT := main.out

build:
	g++ ./main.cpp --std=c++2b -DDEBUG -o $(OUTPUT)
run:
	./$(OUTPUT) < input
clean:
	rm -rf $(OUTPUT)
all: build run clean