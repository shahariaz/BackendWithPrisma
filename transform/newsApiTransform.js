import { getImageUrl } from "../utils/helper.js";

class NewsApiTransform{
    static transform(news){
        return {
            id:news.id,
            title:news.title,
            news:news.content,
            image:getImageUrl(news.image),
            user_id:news.user_id,
            created_at:news.created_at,
            updated_at:news.updated_at,
            reporter:{
                id:news.user.id,
                name:news.user.name,
                profile:news?.user?.profile !=null ? getImageUrl(news?.user?.profile) : null
            }
        }
    }
}
export default NewsApiTransform;