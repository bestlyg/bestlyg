const TRUNCATE_TITLE_MAX_LENGTH = 180;

const TRUNCATE_TITLE_ELLIPSIS = '…';

/** 截断数据库短标题字段，避免超长标题入库失败。 */
export function truncateTitle(title: string): string {
    const chars = Array.from(title);
    if (chars.length <= TRUNCATE_TITLE_MAX_LENGTH) {
        return title;
    }

    // title 对应数据库里的短标题字段，超长时保留省略号避免入库失败。
    return (
        chars.slice(0, TRUNCATE_TITLE_MAX_LENGTH - TRUNCATE_TITLE_ELLIPSIS.length).join('') +
        TRUNCATE_TITLE_ELLIPSIS
    );
}
