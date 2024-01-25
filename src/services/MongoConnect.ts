import { Db, MongoClient, Collection } from "mongodb";
//TODO: MongoConnect pres Constructor bez dotenv + getCollection(name:string)

//Local DB connection instance
//Trida acceptuje URI a dbname("blog")
export class MongoConnect {
  private client: MongoClient;
  private dbName: string;
  private db?: Db; //Mongo db.use()

  constructor(URI: string, dbName: string) {
    this.client = new MongoClient(URI);
    this.dbName = dbName;
  }
  //Actual connection
  async connectDB() {
    try {
      await this.client.connect();
      this.db = this.client.db(this.dbName);
    } catch (error) {
      console.error("Failed to connect to MongoDB.", error);
    }
  }
  //Ziskavani kolekce presunuto do Connection
  getCollection(name: string): Collection {
    if (!this.db) {
      throw new Error("Database is not connected"); //Or some other error in Mongo
    }
    return this.db.collection(name);
  }
}
