<template>
  <div class="tools-url-parser">
    <div class="div-for-input">
      <input
        type="text"
        v-model="inputUrl"
        @focus="$event.target.select()"
        placeholder="Enter url here"
      >
      <a class="square_btn" @click="handleClickParse()">Parse</a>
    </div>
    <div class="loader" v-if="loader">
      <BallClipRotatePulseLoader color="#3eaf7c" size="40px"></BallClipRotatePulseLoader>
    </div>
    <div v-if="error" class="danger custom-block">{{error}}</div>
    <div class="for-result" v-if="result">
      <hr>
      <div class="result-title">{{result.title}}</div>
      <div class="result-description">{{result.description}}</div>
      <div class="image">
        <img :src="result.image" alt class="image">
      </div>
      <div class="all-data">
        <details>
          <summary>All Result</summary>
          <vue-json-pretty :data="result.allData"></vue-json-pretty>
        </details>
        <details>
          <summary>Links</summary>
          <div class="for-links">
            <div v-for="link in getLinksFormat">
              <div class="title">{{link.name}}</div>
              <input
                type="text"
                class="input-for-link"
                :value="link.code"
                @focus="$event.target.select()"
              >
            </div>
          </div>
        </details>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import VueJsonPretty from "vue-json-pretty";
import "vue-loaders/dist/vue-loaders.css";
import { BallClipRotatePulseLoader } from "vue-loaders";
const urlApiOpenGraph = (inputUrlEncoded, appId = "5874db781d4a2e0e00474df2") =>
  "https://opengraph.io/api/1.0/site/" + inputUrlEncoded + "?app_id=" + appId;
export default {
  components: {
    VueJsonPretty,
    BallClipRotatePulseLoader
  },
  data() {
    return {
      inputUrl: "",
      result: false,
      htmlInferred: false,
      loader: false,
      error: false
    };
  },
  methods: {
    async handleClickParse() {
      const conditionToRun = this.inputUrl.trim() !== "";
      if (conditionToRun) {
        this.resetParse();
        this.loader = true;
        const inputUrlEncoded = encodeURIComponent(this.inputUrl);
        const urlFromApi = urlApiOpenGraph(inputUrlEncoded);
        try {
          const req = await axios.get(urlFromApi);
          if (req.status < 300) {
            const { data } = req;
            const { htmlInferred, hybridGraph } = data;
            this.result = {
              allData: data,
              title: htmlInferred.title,
              description: htmlInferred.description,
              image: hybridGraph.image
            };
          }
        } catch (e) {
          this.error = e.message;
        }

        this.loader = false;
      }
    },
    resetParse() {
      this.result = false;
      this.error = false;
    }
  },
  computed: {
    getLinksFormat() {
      return [
        {
          name: "Markdown",
          code: `[${this.result.title}](${this.inputUrl})`
        },
        {
          name: "HTML",
          code: `<a href="${this.inputUrl}">${this.result.title}</a>`
        },
        {
          name: "DokuWiki",
          code: `[[${this.inputUrl}|${this.result.title}]]`
        },
        {
          name: "MediaWiki",
          code: `[${this.inputUrl} ${this.result.title}]`
        }
      ];
    }
  }
};
</script>

<style lang="scss" scoped>
.tools-url-parser {
  margin-top: 20px;
  .loader {
    text-align: center;
    margin-top: 15px;
  }
  .for-result {
    margin-top: 20px;
    .result-title {
      font-size: 18px;
      font-weight: bold;
    }
    .result-description {
      font-style: italic;
    }
    .image {
      text-align: center;
      margin-top: 10px;
      max-height: 100px;
    }
    .all-data {
      details {
        summary {
          cursor: pointer;
        }
        .for-links {
          padding: 5px;
          .title {
            font-weight: 400;
            color: #3eaf7c;
            font-style: italic;
            margin: 10px 0 5px 0;
          }
        }
      }
      .input-for-link {
        width: 100%;
        font-family: "Courier New", Courier, monospace;
      }
    }
  }
  .div-for-input {
    text-align: center;
    margin: 0 auto;
    input[type="text"] {
      text-align: center;
      width: 100%;
      line-height: 2;
    }
    .square_btn {
      margin-top: 10px;
      position: relative;
      display: inline-block;
      font-weight: bold;
      padding: 0.25em 0.5em;
      text-decoration: none;
      color: #fff;
      background: #3eaf7c;
      transition: 0.4s;
      cursor: pointer;
    }

    .square_btn:hover {
      background: #1ec7bb;
    }
  }
}
</style>
