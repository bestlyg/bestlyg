#ifndef STACK
#define STACK

typedef struct stack_node
{
    void *data;
    struct stack_node *next;
} StackNode;

StackNode *stack_node_create();
void stack_node_free(StackNode *n);

typedef struct stack
{
    int size;
    StackNode *head;
} Stack;

Stack *stack_create();
void stack_free(Stack *s);
void stack_push(Stack *s, void *data);
void stack_pop(Stack *s);
void *stack_top(Stack *s);

#endif