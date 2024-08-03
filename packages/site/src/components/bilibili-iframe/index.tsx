interface BiliBiliIFrameProps {
    /**	UGC 视频 ID。aid、bvid 选择其一即可 */
    aid?: number;
    /**	UGC 视频 ID */
    cid?: number;
    /** UGC 视频 ID。aid、bvid 选择其一即可 */
    bvid?: string;
    /**	OGV 视频 ID */
    seasonId?: number;
    /** OGV 视频 ID。优先级高于 aid、bvid */
    episodeId?: number;
    /**	展示封面 */
    poster?: boolean;
    /**	自动播放 */
    autoplay?: boolean;
    /**	静音 */
    muted?: boolean;
    /**	跳转到媒体的初始时间点，单位：秒 */
    t?: number;
    /**	false 表示关闭弹幕，其他表示默认值 */
    danmaku?: boolean;
    /**	群组种类。非通用业务需要此参数 */
    kind?: number;
    /**	跳链时携带当前的 Referrer。用于合作方查询来自嵌入网站的跳转次数 */
    refer?: boolean;
    /**	多 P 视频的集数。从 1 开始计数，若有 cid 参数，则此参数不生效 */
    p?: number;
    iframeProps?: React.DetailedHTMLProps<
        React.IframeHTMLAttributes<HTMLIFrameElement>,
        HTMLIFrameElement
    >;
}

const defaultProps: BiliBiliIFrameProps = {
    poster: true,
    autoplay: false,
    muted: true,
    danmaku: false,
};
/**
 * @doc https://player.bilibili.com/
 */
export function BiliBiliIFrame(props: BiliBiliIFrameProps) {
    const { iframeProps, ...restProps } = props;
    const query = { ...defaultProps, ...restProps };
    const qs = Object.entries(query)
        .filter(([, v]) => v !== undefined)
        .map(([k, v]) => {
            if (typeof v === 'boolean') v = Number(v);
            return [k, v];
        })
        .map(([k, v]) => `${k}=${v}`)
        .join('&');
    const src = `//player.bilibili.com/player.html?${qs}`;
    return (
        <iframe
            width="600"
            height="400"
            src={src}
            allow="fullscreen"
            {...iframeProps}
        />
    );
}
