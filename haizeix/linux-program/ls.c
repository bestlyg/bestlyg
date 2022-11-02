#include "stdio.h"
#include "stdlib.h"
#include "unistd.h"
#include "dirent.h"
#include "sys/types.h"
#include "string.h"

#define FILEMAX 1024
#define NAMEMAX 256

int flag_a = 0, flag_l = 0;

void do_stat(const char *filename) {
    printf("Doing with stat %s.\n", filename);
}

int cmp_name(const void *a, const void *b) {
    // printf("cmp : %s & %s = %d\n", (const char *)a, (const char *)b, strcmp((const char*)a, (const char *)b));
    return strcmp((const char*)a, (const char *)b);
}

void do_ls(const char *dirname) {
    DIR *dirp = NULL;
    struct dirent *direntp;
    char names[FILEMAX][FILEMAX] = {0};
    if ((dirp = opendir(dirname)) == NULL) {
        if (access(dirname, R_OK) == 0) {
            if (flag_l == 0) {
                printf("%s\n", dirname);
                return;
            } else {
                // do_stat(dirname);
                return;
            }
        } else {
            perror(dirname);
            return;
        }
    } else {
        printf("%s\n", dirname);
        int cnt = 0;
        while ((direntp = readdir(dirp)) != NULL) {
            if (direntp->d_name[0] == '.' && flag_a == 0) continue;
            strcpy(names[cnt++], direntp->d_name);
        }
        qsort(names, cnt, FILEMAX, cmp_name);
        /*
        for (int i = 0; i < cnt; i++) {
            printf("idx = %d, filename = %s\n", i, names[i]);
        }
        */
        if (flag_l == 1) {
            for (int i = 0; i < cnt; i++) {
                do_stat(names[i]);
            }
        } else {

        }
    }
    printf("Doing with dir %s.\n", dirname);
}

int main(int argc, char **argv) {
    int opt;
    while ((opt = getopt(argc, argv, "al")) != -1) {
        switch (opt) {
            case 'a':
                flag_a = 1;
                break;
            case 'l':
                flag_l = 1;
                break;
            default:
                fprintf(stderr, "Usage: %s [-al] [filename]\n", argv[0]);
                exit(1);
        }
    }
    printf("flag_a = %d, flag_l = %d\n", flag_a, flag_l);

    // optind : 最后一个匹配完成的下标
    printf("optind = %d\n", optind);

    argc -= optind - 1;
    argv += optind - 1;

    printf("argc = %d,  argv = %s\n", argc, *(argv + 1));

    if (argc == 1) {
        do_ls(".");
    } else {
        while (--argc) {
            do_ls(*(++argv));
        }
    }
    return 0;
}