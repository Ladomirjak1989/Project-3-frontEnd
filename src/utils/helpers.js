import axios from "axios";


const apiKey = import.meta.env.CHAT_KEY; // API-ключ із змінних оточення
const apiUrl = import.meta.env.API_URL; // URL до API

const translateChatGPT = async (formData, lang) => {
    const headers = {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
    };
    // Запит до ChatGPT з явним завданням перекласти на певну мову
    const data = {
        model: 'gpt-3.5-turbo',
        messages: [
            { role: 'system', content: `Please translate the following text to ${lang}:` },
            { role: 'user', content: formData }
        ],
    };

    try {
        const result = await axios.post(apiUrl, data, { headers });
        return result.data.choices[0].message.content;
    } catch (error) {
        return ('Помилка при запиті:');
    }
}

export default translateChatGPT



