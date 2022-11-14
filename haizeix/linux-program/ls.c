#include "stdio.h"
#include "stdlib.h"
#include "unistd.h"
#include "dirent.h"
#include "sys/types.h"
#include "string.h"
#include "sys/ioctl.h"
#include "sys/stat.h"
#include "math.h"
#include "grp.h"
#include "pwd.h"
#include "time.h"
#define FILEMAX 1024
#define NAMEMAX 256

int flag_a = 0, flag_l = 0, dir_num = 0;
int fg_c, bg_c;

void update_color(mode_t mode) {
    bg_c = 0;
    fg_c = 37;
    if (mode & (S_IXUSR | S_IXGRP | S_IXOTH)) fg_c = 32;
    switch(mode & S_IFMT) {
        case S_IFDIR:
            fg_c = 34;
            break;
        case S_IFLNK:
            fg_c = 36;
            break;
    }
}

void show_files(char names[][FILEMAX], int cnt, int row, int col) {
    int wide_file[cnt];
    struct stat tmp_st;
    memset(wide_file, 0, sizeof(int) * cnt);
    for (int i = 0; i < col; i++) {
        for (int j = i * row; j < (i + 1) * row && j < cnt; j++) {
            if (wide_file[i] < strlen(names[j])) wide_file[i] = strlen(names[j]);
        }
    }
    for (int i = 0; i < row; i++) {
        for (int j = i; j < i + (row * col) && j < cnt; j += row) {
            int tmp = j / row;
            stat(names[j], &tmp_st);
            update_color(tmp_st.st_mode);
            printf("\033[%d;%dm%-*s\033[0m", bg_c, fg_c, wide_file[tmp] + 1, names[j]);
        }
        printf("\n");
    }
}

void mode_to_str(mode_t mode, char *str) {
    if (S_ISREG(mode)) str[0] = '-';
    if (S_ISDIR(mode)) str[0] = 'd';
    if (S_ISCHR(mode)) str[0] = 'c';
    if (S_ISBLK(mode)) str[0] = 'b';
    if (S_ISSOCK(mode)) str[0] = 's';
    if (S_ISLNK(mode)) str[0] = 'l';
    if (S_ISFIFO(mode)) str[0] = 'p';

    if (mode & S_IRUSR) str[1] = 'r';
    if (mode & S_IWUSR) str[2] = 'w';
    if (mode & S_IXUSR) str[3] = 'x';

    if (mode & S_IRGRP) str[4] = 'r';
    if (mode & S_IWGRP) str[5] = 'w';
    if (mode & S_IXGRP) str[6] = 'x';

    if (mode & S_IROTH) str[7] = 'r';
    if (mode & S_IWOTH) str[8] = 'w';
    if (mode & S_IXOTH) str[9] = 'x';

    if ((mode & S_IXUSR) && (mode & S_ISUID)) str[3] = 's';

    update_color(mode);
}

char *uid_to_name(uid_t uid) {
    struct passwd *pw_ptr;
    static char tmpstr[10] = {0};
    if ((pw_ptr = getpwuid(uid)) == NULL) {
        sprintf(tmpstr, "%d", uid);
        return tmpstr;
    } else {
        return pw_ptr->pw_name;
    }
}

char *gid_to_name(gid_t gid) {
    struct group *gr_ptr;
    static char tmpstr[10] = {0};
    if ((gr_ptr = getgrgid(gid)) == NULL) {
        sprintf(tmpstr, "%d", gid);
        return tmpstr;
    } else {
        return gr_ptr->gr_name;
    }
}

void show_info(const char *filename, struct stat *info) {
    char modestr[12] = "-----------";
    mode_to_str(info->st_mode, modestr);
    printf("%s ", modestr);
    printf("%4ld ", info->st_nlink);
    printf("%10s ", uid_to_name(info->st_uid));
    printf("%10s ", gid_to_name(info->st_gid));
    printf("%10ld ", info->st_size);
    printf("%.15s ", 4 + ctime(&info->st_mtime));
    printf("\033[%d;%dm%s\033[0m ", bg_c, fg_c, filename);

    if (modestr[0] == 'l') {
        int cnt;
        char buf[NAMEMAX] = {0};
        if ((cnt = readlink(filename, buf, NAMEMAX)) < 0) {
            perror("readlink");
        }
        printf("-> \033[%d;%dm%s\033[0m", bg_c, fg_c, buf);
    }
    printf("\n");
}

void do_stat(const char *filename) {
    struct stat st;
    if (stat(filename, &st) < 0) {
        perror(filename);
    } else {
        show_info(filename, &st);
    }
    // printf("Doing with stat %s.\n", filename);
}

int cmp_name(const void *a, const void *b) {
    // printf("cmp : %s & %s = %d\n", (const char *)a, (const char *)b, strcmp((const char*)a, (const char *)b));
    return strcmp((const char*)a, (const char *)b);
}

void size_window(char names[][FILEMAX], int cnt, int *row, int *col) {
    struct winsize size;
    int len[cnt], max = 0, total = 0;
    memset(len, 0, sizeof(int) * cnt);
    if (isatty(STDOUT_FILENO) == 0) {
        exit(1);
    }
    if (ioctl(STDOUT_FILENO, TIOCGWINSZ, &size) < 0) {
        perror("ioctl");
        exit(1);
    }
    printf("winsize row = %d, col = %d\n", size.ws_row, size.ws_col);
    for (int i = 0; i < cnt; i++) {
        len[i] = strlen(names[i]);
        if (max < len[i]) max = len[i];
        total += len[i] + 1;
    }
    if (max + 1 >= size.ws_col) {
        *row = cnt;
        *col = 1;
        return;
    }
    if (total <= size.ws_col) {
        *row = 1;
        *col = cnt;
        return;
    }
    int try_begin = 0;
    for (int i = 0, tmp = 0; i < cnt; i++) {
        tmp += len[i] + 1;
        if (tmp >= size.ws_col) {
            try_begin = i;
            break;
        }
    }
    for (int i = try_begin; ; i--) {
        int *wide = (int *)malloc(sizeof(int) * i);
        memset(wide, 0, sizeof(int) * i);
        *row = (int)ceil(1.0 * cnt / i);
        int try_sum = 0;
        for (int x = 0; x < i; x++) {
            for (int y = x * *row; y < (x + 1) * *row && y < cnt; y++) {
                if (wide[x] < len[y]) wide[x] = len[y];
            }
            try_sum += wide[x] + 1;
        }
        if (try_sum > size.ws_col) continue;
        if (try_sum <= size.ws_col) {
            *col = i;
            break;
        }
    }
}

void do_ls(const char *dirname) {
    DIR *dirp = NULL;
    struct dirent *direntp;
    char names[FILEMAX][FILEMAX] = {0};
    if ((dirp = opendir(dirname)) == NULL) {
        if (access(dirname, R_OK) == 0) {
            if (flag_l == 0) {
                dir_num--;
                struct stat tmp_st;
                stat(dirname, &tmp_st);
                update_color(tmp_st.st_mode);
                printf("\033[%d;%dm%s\033[0m\n", bg_c, fg_c, dirname);
                return;
            } else {
                dir_num--;
                do_stat(dirname);
                return;
            }
        } else {
            perror(dirname);
            return;
        }
    } else {
        printf("%s\n", dirname);
        chdir(dirname);
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
            printf("Print all file.\n");
            int row, col;
            size_window(names, cnt, &row, &col);
            printf("row = %d, col = %d\n", row, col);
            show_files(names, cnt, row, col);
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
        dir_num = 0;
        do_ls(".");
    } else {
        dir_num = argc - 2;
        while (--argc) {
            do_ls(*(++argv));
        }
    }
    return 0;
}