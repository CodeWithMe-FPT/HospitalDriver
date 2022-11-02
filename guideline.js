export const getAccountStatus = async ()=>{
    let driver = [
        {
            id: "saHDS*T&SDgasd",
            name: "Manh",
            status: "1",
        },
        {
            id: "dfsUIds324",
            name: "Giang",
            status: "0",
        },
        {
            id: "dfsUIds324",
            name: "Thach",
            status: "1",
        }
    ];
    // status: "1"  (chưa logout), status: "0" ( (đã logout)
    // success return id, failed return "failed", else return "none"
    return driver.id;
}

export const getAccountList = async ()=>{
    let driver = [
        {
            id: "saHDS*T&SDgasd",
            name: "Manh",
            status: "1",
        },
        {
            id: "dfsUIds324",
            name: "Giang",
            status: "0",
        },
        {
            id: "dfsUIds324",
            name: "Thach",
            status: "1",
        }
    ];
    // success return id, failed return "failed", else return "none"
    return driver.status;
}


export const getListVictim = async (id) =>{
    let victimList = [
        {
            idCase: "HSDas97ds",
            name: "Lan",
            phone: "0333238493",
            location: "10.750283619930125, 106.62465864500268",
            distance: "30",
            status: "0"
        },
        {
            idCase: "xcvchv97ds",
            name: "Long",
            phone: "0333238493",
            location: "10.750283619930125, 106.62465864500268",
            distance: "30",
            status: "2"
        },
        {
            idCase: "zxcz9vxc9hdsa",
            name: "Quang",
            phone: "0333238493",
            location: "10.750283619930125, 106.62465864500268",
            distance: "30",
            status: "1"
        },
        {
            idCase: "dsd76xcvtgxi",
            name: "Thang",
            phone: "0333238493",
            location: "10.750283619930125, 106.62465864500268",
            distance: "0"
        },
    ]
    return victimList;
}