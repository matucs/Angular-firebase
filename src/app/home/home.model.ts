export class ThisThatModel {
    This: string;
    That: string;
    imgUrl: string;
    likes: string;
    shares: string;
    votes: number;
    reach: any;
    comments = new Array<CommentModel>();
    user = new Array<UserModel>();
}
export class CommentModel {
    content = "";
    parentId = "";
    user= new UserModel();
}
export class UserModel {
    name = "";
    img :any;
    gender = "";
    countryId = 0;
    country =""
}
export class ChartModel {
    gender = "";
    country ="";
    value=0;
}
export class IconsSrc {
    thisThat: any;
    dashboard: any;
    managePoll: any;
    createPoll: any;
    publishAndPromote: any;
    tT: any;
    tick: any;
    total: any;
    like: any;
    gender: any;
    share: any;
    thread: any;
    message: any;
}