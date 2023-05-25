function paginate(followers){
    const itemsPerPage = 10;
    const pages = Math.ceil(followers.length / itemsPerPage);

    const newFollowers = new Array(pages).fill("").map((_, index)=>{
        const start = index * itemsPerPage;
        return followers.slice(start, start + itemsPerPage);
    });

    console.log(newFollowers);

    return newFollowers;
}

export default paginate;