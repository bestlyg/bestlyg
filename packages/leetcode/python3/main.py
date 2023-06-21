from preclude import *


class Solution:
    def flipChess(self, chessboard: List[str]) -> int:
        n = len(chessboard)
        m = len(chessboard[0])
        sum = 0

        def dfs(board:List[List[str]],i:int,j:int):
            list = []
            res = 0
            for dir in dirs2:
                ni = i + dir[0]
                nj = j + dir[1]
                tmp = []
                while 0 <= ni < n and 0 <= nj < m and board[ni][nj] == 'O':
                    tmp.append((ni,nj))
                    ni += dir[0]
                    nj += dir[1]
                if 0 <= ni < n and 0 <= nj < m and board[ni][nj] == 'X':
                    for item in tmp:
                        list.append(item)
            sum += len(list)

            for i,j in list: board[i][j] = 'X'
            for i,j in list: dfs(board,i,j)

            return res

        for i in range(n):
            for j in range(m):
                if chessboard[i][j] == '.':
                    board = [list(chessboard[i]) for i in chessboard]
                    board[i][j] = 'X'
                    sum = 0
                    dfs(board, i, j, sum)
                    res = max(res, sum)
        return res


def main():
    o = Solution()
    res = o.alphabetBoardPath(
        "leet"
    )
    print(res)


main()
