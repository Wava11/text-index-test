import { MongoClient, Collection } from 'mongodb';
import { Media, mockMedias } from './media';

const names = ["אני יחיד", "אתה", "את", "אתם", "אתן", "הם", "הן", "אנחנו"];
const tags = ["כוס יחידה", "שולחן", "מזלג", "סכין קצרה", "סכין ארוכה", "סכין חדה", "מזלג משולש", "מזלג מרובע", "כף", "כפית", "כיסא", "מפה", "צלחת"];
const descriptions = [
    "גוף ראשון יחיד",
    "גוף שני זכר יחיד",
    "גוף שני נקבה יחידה",
    "גוף שני זכר רבים",
    "גוף שני נקבה רבות",
    "גוף שלישי זכר רבים",
    "גוף שלישי נקבה רבות",
    "גוף ראשון רבים"
];

const createTextIndex = (collection: Collection<Media>) => collection.createIndex({ name: "text", tags: "text", description: "text" });

const initCollection = (collection: Collection<Media>) => async (mediasAmount: number) => {
    console.time("init");
    const medias = mockMedias(names, tags, descriptions)(mediasAmount);

    await collection.deleteMany({});
    await collection.insertMany(medias);
    console.timeEnd("init");
};

const performSearch = (collection: Collection<Media>) =>
    async (textQuery: string): Promise<Media[]> => {
        console.time("search");
        const result = await collection.find({
            $text: {
                $search: textQuery
            }
        }).limit(50).toArray();
        console.timeEnd("search");
        return result;
    };


(async () => {

    const client = new MongoClient("mongodb://localhost:27017");
    console.log("connecting");
    await client.connect();
    console.log("connected");

    const mediaCollection = client.db("test").collection<Media>("media");

    const initMediaCollection = initCollection(mediaCollection);
    const performMediaSearch = performSearch(mediaCollection);


    // await initMediaCollection(100000)

    const results = await performMediaSearch("יחיד");

    // console.log(results);
    console.log(results.length);


    await client.close();

})();