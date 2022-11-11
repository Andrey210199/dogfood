export default function isLike(likes, userId){
    return likes.some(id=>id=== userId);
}