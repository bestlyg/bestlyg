export interface Resume {
  /** 基础信息 */
  info: {
    /** 姓名 */
    name: string;
    /** 性别 */
    gender: string;
    /** 年龄 */
    age: number;
    /** 出生年月日 */
    birthday: Date;
    /** 出生地 */
    birthplace: string;
    /** 学校 */
    school: string;
    /** 学历 */
    education: string;
    /** 专业 */
    major: string;
    /** 电话 */
    phone: string;
    /** 邮箱 */
    email: string;
    /** 微信 */
    wechat: string;
    /** QQ */
    qq: string;
  };
  /** 自我评价 */
  evaluation: string;
  /** 求职意向 */
  job: {
    /** 地点 */
    place: string;
    /** 岗位 */
    position: string;
    /** 薪资 */
    money: number;
  };
  /** 教育经历 */
  educationalExperience: {
    /** 开始时间 */
    startTime: Date;
    /** 结束时间 */
    endTime: Date | null;
    /** 学历 */
    education: string;
    /** 专业 */
    major: string;
    /** 描述 */
    describe: string;
  }[];
  /** 工作经历 */
  workExperience: {
    /** 开始时间 */
    startTime: Date;
    /** 结束时间 */
    endTime: Date | null;
    /** 公司名 */
    name: string;
    /** 岗位 */
    position: string;
    /** 描述 */
    describe: string;
  }[];
  /** 项目经历 */
  projectExperience: {
    /** 开始时间 */
    startTime: Date;
    /** 结束时间 */
    endTime: Date | null;
    /** 项目名 */
    name: string;
    /** 岗位 */
    position: string;
    /** 描述 */
    describe: string;
  }[];
  skills: {
    img: string;
    name: string;
  }[];
}
