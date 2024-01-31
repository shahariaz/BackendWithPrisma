class NewsApiTransform{
    static transform(news){
        return {
            id:news.id,
            title:news.title,
            description:news.description,
            image:news.image,
            user_id:news.user_id,
            created_at:news.created_at,
            updated_at:news.updated_at
        }
    }
}