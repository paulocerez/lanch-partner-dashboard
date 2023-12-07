import * as admin from "firebase-admin";
import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";

const serviceAccount = {
  projectId: "lanch-partner-dashboard",
  clientEmail: process.env.CLIENT_EMAIL,
  privateKey: process.env.PRIVATE_KEY?.replace(/\\n/g, "\n"),
};

const firebaseAdminConfig = {
  credential: cert(serviceAccount),
};
const adminApp =
  getApps().length <= 0 ? initializeApp(firebaseAdminConfig) : getApps()[0];

export const firebaseApp = adminApp;
export const adminAuth = getAuth(adminApp);

// const firebaseAdminConfig = {
//   credential: cert({
//     projectId: "lanch-partner-dashboard",
//     clientEmail:
//       "firebase-adminsdk-6ywl9@lanch-partner-dashboard.iam.gserviceaccount.com",
//     privateKey:
//       "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQDQiDZvilBV9F0F\n2wChrtVuSausjhXJGquroCxbF5kn2kgGFGf3Zfpp6mYSzRxj2BnSoEzQn1xd+IAK\nNp/XYMJqMl4tuiyoZNqiW1yuzORSLB94ISV3Lv0P0dlQ9hQOQ/OnhQrkz8iXqZIs\nkOxerMpyUl2Nv2kb+C5abOHVz1E8qo06n2RUoFxYy/++XwSLfbXFkCOLJAmZAFph\np0fpL9zQK9Qb8PlTlUWErEbQyFs4fm5YucngkpcvpEOkH9cjdH5UCYHVXjUUoebe\n+x1HGz0lIxv2xqtbT9+qSrAMT3afxOYdJz7utEZ70oKuOnw8BZvcyLHFYww3n+lu\nsWSS5h1FAgMBAAECggEAHSCJifbl1bu2KpU2d172TNtZcVa/UEG7bNOInoijSd/B\nY6gCBZpm6dhlvYaMyp1qrfLaB+Hagv2s1MBgfzLytOaoJPb2OecsarUcMwZHdfrX\nwm3Oz+DuVAFZu2dD0eJH7EQ3C1LCj/yNgFAV0/uKo4FBtATiZ5e40cSXnsfAbxqa\n2JQ/EN6bXPS+27Yj3mnBxabQ7waNSylPCqVPyXt6SKJHrgBOu5E/XUHmi4jUg5f4\nM+PRjFOPrmhDz4oVPEKPqajbe/jAi75OqXIDtevBKwycrvTW0HbYHy4OGSo10b0K\nBmxEcn78/6ucfUudaYjSrjmKJ76vGecTbjef90Z6mQKBgQDxKOB/dXzpawuqTCIL\nYD5rZugjJJGHDDtMM6vGuqwusI/qrWhT+E7W5fi1UsaSw1yi2Iz1Eo2X4vqUIExJ\ny0y/ZgbjihN1vFP+P4Yf5oBEXFjZkksA8VZ32delt3ikEj2d7LVLbVk4eCYKxF+x\ndI2aEeIqs9xu2kYsjb0ildcIzwKBgQDdXVXAimkwfnGkk7ajBLh9VxbJQZ2hp++O\n0viyJ+EJdQBM+4nMyr9xSmB1isbirX9uNddTxBar5+5dIgEru9TbZJI4I6+FqlUc\n0G8ySmpWKwM0luQYyXWdHdqlc8LFd1r9l1n877mX+tHFPerTIwXJxogaovsnKg5c\nP4+v7OHVqwKBgQC6XzTgTBP08F1bhuroj8CtkCHmxuQQ0kshYO1n7+wRSTJv0wPF\noSiMu72xo/8CfSiiUWjeHTCAKVIuF6fdf9gYMukwAA1598mRu9YT4TdPnW6s9now\niFKi3R/jWh9J7S7hVYXmfONu2KvNtmWd5s1oPFnlVosMwHNrCz8X82Tz0QKBgEdW\nTMw/zqZSGU1wTOs8GjhKWI2DF8mA1TKxynOfZmYlznMAnOfibs+TqII4tt9WCjr6\nHupfxu6fT7Gzw6zUW0RYpMZyuZ3ZxpQCl9MdKCectOu9tMRIKB75//xR0fLRBAG1\nRMq+dpEDw5ZM3eAs6TCdSj9LRqTYaMhRs3x+WkkBAoGAC7KPbcvCflUKAkWrXPAx\n3Co3G/cKRBL3wCC17BHdPrzETVIHa2DjEnfEBYRSgaRIKB4hbh5Yean7WHiPTDyO\nfpflZENEM+G0FZM9yi3FF1CpLmqo8lxmLeKRO5Q0kktjkICGb0whunAJNgu67z9K\n4RQ+3tJ8d/hY+3J9oGTMBqE=\n-----END PRIVATE KEY-----\n",
//   }),
// };
