var api = module.exports = {};

//进入大厅
api.entry = function (token, userInfo, cbRouter, cbFail) {
    var router = 'connector.entryHandler.entry';
    var requestData = {
        token: token,
        userInfo: userInfo
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'EntryHallResponse', cbFail);
};

// --------------------------------------------用户相关------------------------------------------
//查找玩家，获取玩家信息
api.searchRequest = function (uid, cbRouter) {
    var router = 'hall.userHandler.searchUserData';
    var requestData = {
        uid:uid
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'SearchResponse')
};

//绑定手机号
api.bindPhoneRequest = function (phone, verificationCode, imgCodeInfo, cbRouter) {
    var router = 'hall.userHandler.bindPhone';
    var requestData = {
        phone: phone,
        verificationCode: verificationCode,
        imgCodeInfo: imgCodeInfo
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'BindPhoneResponse');
};

// 修改昵称
api.changeNicknameRequest = function (nickname, cbRouter) {
    var router = 'hall.userHandler.updateNickname';
    var requestData = {
        nickname: nickname
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'ChangeNicknameResponse');
};

// 修改头像
api.changeAvatarRequest = function (avatar, cbRouter) {
    var router = 'hall.userHandler.updateAvatar';
    var requestData = {
        avatar: avatar
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'ChangeAvatarResponse');
};

// 更新银行卡信息
api.updateBankCardInfoRequest = function (cardNumber, bankName, ownerName, cbRouter) {
    var router = 'hall.userHandler.updateBankCardInfo';
    var requestData = {
        bankCardInfo: {
            cardNumber: cardNumber,
            bankName: bankName,
            ownerName: ownerName
        }
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'UpdateBankCardInfoResponse');
};

// 更新支付宝信息
api.updateAliPayInfoRequest = function (aliPayAccount,  ownerName, cbRouter) {
    var router = 'hall.userHandler.updateAliPayInfoRequest';
    var requestData = {
        aliPayInfo: {
            aliPayAccount: aliPayAccount,
            ownerName: ownerName
        }
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'UpdateAliPayInfoResponse');
};

// 保险柜操作
/**
 * @param count 大于0为存入，小于0为取出
 * @param password 取出时需要密码
 * @param cbRouter
 */
api.safeBoxOperationRequest = function (count, password, cbRouter) {
    var router = 'hall.userHandler.safeBoxOperation';
    var requestData = {
        count: count,
        safePassword: password
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'SafeBoxOperationResponse');
};

// 修改登录密码
api.updateLoginPasswordRequest = function (oldPassword, newPassword, cbRouter) {
    var router = 'hall.userHandler.updateLoginPassword';
    var requestData = {
        oldPassword: oldPassword,
        newPassword: newPassword
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'UpdateLoginPasswordResponse');
};

// 修改保险柜密码
api.updateSafePasswordRequest = function (oldPassword, newPassword, cbRouter) {
    var router = 'hall.userHandler.updateSafePassword';
    var requestData = {
        oldPassword: oldPassword,
        newPassword: newPassword
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'UpdateSafePasswordResponse');
};

// 提款申请
/**
 * @param count
 * @param withdrawCashType: enumeration.withdrawCashType
 * @param cbRouter
 */
api.withdrawCashRequest = function (count, withdrawCashType, cbRouter) {
    var router = 'hall.currencyHandler.withdrawCashRequest';
    var requestData = {
        count: count,
        withdrawCashType: withdrawCashType
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'WithdrawCashResponse');
};

// 提取佣金
api.extractionCommissionRequest = function (cbRouter) {
    var router = 'hall.currencyHandler.extractionCommission';
    var requestData = {};
    Global.NetworkManager.send(router, requestData, cbRouter || 'ExtractionCommissionResponse');
};

// --------------------------------------------排行榜相关------------------------------------------
// 获取今日赢金币数量排行榜
api.getTodayWinGoldCountRankRequest = function(startIndex, count, cbRouter){
    var router = 'center.rankHandler.getTodayWinGoldCountRankRequest';
    var requestData = {
        startIndex: startIndex,
        count: count
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'GetTodayWinGoldCountRankResponse');
};

// --------------------------------------------充值相关------------------------------------------
//购买商城物品
api.purchaseRechargeItemRequest = function(itemID, rechargePlatform, rechargeInfo, cbRouter){
    var router = 'hall.rechargeHandler.purchaseItem';
    var requestData = {
        itemID: itemID,
        rechargePlatform: rechargePlatform,
        rechargeInfo: rechargeInfo
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'PurchaseRechargeItemResponse');
};

// --------------------------------------------记录相关------------------------------------------
// 获取记录
/**
 * recordType : enumeration.recordType
 */
api.getRecordDataRequest = function(recordType, startIndex, count, cbRouter){
    var router = 'hall.recordHandler.getRecordData';
    var requestData = {
        recordType: recordType,
        startIndex: startIndex,
        count: count
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'GetRecordDataResponse')
};

api.getGameRecordDataRequest = function (matchData, sortData, cbRouter) {
    var router = 'hall.recordHandler.getGameRecordDataRequest';
    var requestData = {
        matchData: matchData,
        sortData: sortData,
        startIndex: 0,
        count: 10
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'GetGameRecordDataResponse');
};

api.getDirectlyMemberRecordDataRequest = function (startIndex, count, cbRouter) {
    var router = 'hall.recordHandler.getDirectlyMemberRecordData';
    var requestData = {
        startIndex: startIndex,
        count: count
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'GetDirectlyMemberRecordDataResponse')
};

api.getAgentMemberRecordDataRequest = function (startIndex, count, cbRouter) {
    var router = 'hall.recordHandler.getAgentMemberRecordData';
    var requestData = {
        startIndex: startIndex,
        count: count
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'GetAgentMemberRecordDataResponse')
};

// --------------------------------------------房间相关------------------------------------------
api.createRoomRequest = function (parameters, gameTypeID, cbRouter){
    var router = 'hall.gameHandler.createRoom';
    var requestData = {
        gameRule: parameters,
        gameTypeID: gameTypeID
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'CreateRoomResponse');
};

api.joinRoomRequest = function (joinRoomID, cbRouter, cbFail){
    var router = 'hall.gameHandler.joinRoom';
    var requestData = {
        roomId: joinRoomID
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'JoinRoomResponse', cbFail);
};

api.exitRoomRequest = function(cbRouter){
    var router = 'hall.gameHandler.exitRoom';
    var requestData = {};
    Global.NetworkManager.send(router, requestData, cbRouter || 'ExitRoomResponse');
};

api.matchRoomRequest = function (gameTypeID, cbRouter) {
    var router = 'hall.gameHandler.matchRoom';
    var requestData = {
        gameTypeID: gameTypeID
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'MatchRoomResponse');
};

api.stopMatchRoomRequest = function (cbRouter) {
    var router = 'hall.gameHandler.stopMatchRoom';
    var requestData = {};
    Global.NetworkManager.send(router, requestData, cbRouter || 'StopMatchRoomResponse');
};

api.getAllRoomGameDataByKind = function (kindID, cbRouter) {
    var router = 'hall.gameHandler.getAllRoomGameDataByKind';
    var requestData = {
        kindID: kindID
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'GetAllRoomGameDataByKindResponse');
};

api.getRoomGameDataByRoomID = function (roomID, cbRouter) {
    var router = 'hall.gameHandler.getRoomGameDataByRoomID';
    var requestData = {
        roomID: roomID
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'GetRoomGameDataByRoomIDResponse');
};

// --------------------------------------------其他相关------------------------------------------
api.readEmailRequest = function(emailID, cbRouter){
    var router = 'hall.emailHandler.readEmail';
    var requestData = {
        emailID: emailID
    };
    Global.NetworkManager.send(router, requestData, cbRouter || 'ReadEmailResponse')
};
