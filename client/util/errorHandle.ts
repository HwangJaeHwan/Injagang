export const errorHandle = (status: number = 1) => {
    switch (status) {
        case 401:
            break;
        case 500:
            alert("서버종료")
            break
        default:
            break;
    }
}