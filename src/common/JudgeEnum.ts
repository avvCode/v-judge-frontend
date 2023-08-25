/**
 * 判题状态枚举定义
 */
const getStatus = (status: number) => {
  const judgeStatus = {
    code: status,
    msg: "",
    color: "",
  };
  switch (status) {
    case 0:
      judgeStatus.msg = "Accepted";
      judgeStatus.color = "#26c513";
      break;
    case 1:
      judgeStatus.msg = "Wrong Answer";
      judgeStatus.color = "#ef0909";
      break;
    case 2:
      judgeStatus.msg = "Compile Error";
      judgeStatus.color = "#eec952";
      break;
    case 3:
      judgeStatus.msg = "Memory Limit Exceeded";
      judgeStatus.color = "#ef0909";
      break;
    case 4:
      judgeStatus.msg = "Time Limit Exceeded";
      judgeStatus.color = "#ef0909";
      break;
    case 5:
      judgeStatus.msg = "Presentation Error";
      judgeStatus.color = "#eec952";
      break;
    case 6:
      judgeStatus.msg = "Waiting";
      judgeStatus.color = "rgb(14,14,14)";
      break;
    case 7:
      judgeStatus.msg = "Output Limit Exceeded";
      judgeStatus.color = "#ef0909";
      break;
    case 8:
      judgeStatus.msg = "Dangerous Operation";
      judgeStatus.color = "#ef0909";
      break;
    case 9:
      judgeStatus.msg = "Runtime Error";
      judgeStatus.color = "#ef0909";
      break;
    case 10:
      judgeStatus.msg = "System Error";
      judgeStatus.color = "#ef0909";
      break;
  }
  return judgeStatus;
};

export default getStatus;
