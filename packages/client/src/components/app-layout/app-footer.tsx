export function AppFooter() {
    return (
        <div className="w-full h-[28px] gap-[4px] flex items-center justify-center text-[#BBBBBB] text-[12px] bg-[#2b3137] p-[32px]">
            <div>
                <a
                    href="https://beian.miit.gov.cn/#/Integrated/index"
                    className="hover:text-[#222222]"
                >
                    浙ICP备19044645号-1
                </a>
                <span>Copyright © {new Date().getFullYear()} BestLyg.</span>
            </div>
        </div>
        // <div className="absolute bottom-0 w-full h-[28px] gap-[4px] flex items-center justify-center text-[#BBBBBB] text-[12px]">
        //     <a href="https://beian.miit.gov.cn/#/Integrated/index" className="hover:text-[#222222]">浙ICP备19044645号-1</a>
        //     <span>Copyright © {new Date().getFullYear()} BestLyg.</span>
        // </div>
    );
}
