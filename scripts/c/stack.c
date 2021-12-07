#include <stdlib.h>
#include <stddef.h>
#include "stack.h"

StackNode *stack_node_create()
{
    StackNode *node = (StackNode *)malloc(sizeof(StackNode));
    node->next = NULL;
    node->data = NULL;
    return node;
}
void stack_node_free(StackNode *n)
{
    free(n);
};

Stack *stack_create()
{
    Stack *s = (Stack *)malloc(sizeof(Stack));
    s->head = NULL;
    s->size = 0;
    return s;
}
void stack_free(Stack *s)
{
    while (s->size)
        stack_pop(s);
    free(s->head);
    free(s);
}
void stack_push(Stack *s, void *data)
{
    StackNode *n = stack_node_create();
    n->data = data;
    n->next = s->head;
    s->head = n;
    s->size += 1;
}
void stack_pop(Stack *s)
{
    if (s->size == 0)
        return;
    StackNode *n = s->head;
    s->head = n->next;
    s->size -= 1;
    free(n);
}
void *stack_top(Stack *s)
{
    return s->head->data;
}