<template>
  <div id="app">
    <div class="container mx-auto">
      <div class="nav">
        <div class="add">
          <button class="add__Btn" @click="addNewData()" type="button">
            +
          </button>
        </div>
        <SearchBar v-model="keyword" />
      </div>
      <div class="main grid">
        <CardItem
          v-for="(item, i) in jsonData"
          :parent-data="item"
          :parent-index="i"
          :key="item.id"
          @delete="deleteData"
          @update="updateData"
        />
      </div>
    </div>
  </div>
</template>

<script>
import CardItem from './components/CardItem.vue';
import SearchBar from './components/SearchBar.vue';

export default {
  name: 'App',
  components: { CardItem, SearchBar },

  data() {
    return {
      jsonData: [],
      keyword: '',
      dataUrl: 'http://localhost:3000/post',
      timeout: null,
    };
  },

  async created() {
    await this.fetchData();
  },

  watch: {
    async keyword(newVal) {
      clearTimeout(this.timeout);
      this.timeout = setTimeout(() => {
        this.fetchSpecData(newVal);
      }, 500);
    },
  },

  methods: {
    async fetchData() {
      try {
        const res = await this.$axios.get(this.dataUrl);
        this.jsonData = res.data;
      } catch (e) {
        console.log(e.message);
      }
    },

    async fetchSpecData(val) {
      try {
        const res = await this.$axios.get(`${this.dataUrl}?q=${val}`);
        this.jsonData = res.data;
      } catch (e) {
        console.log(e.message);
      }
    },

    async addNewData() {
      try {
        const date = Date.now();
        const config = {
          author: '文章作者',
          title: '文章標題',
          content:
            '文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容文章內容',
          time: date,
        };
        const res = await this.$axios.post(this.dataUrl, config);
        this.jsonData.push(res.data);
      } catch (e) {
        console.log(e.message);
      }
    },

    async deleteData(event) {
      try {
        await this.$axios.delete(`${this.dataUrl}/${event.id}`);
        this.jsonData.splice(event.index, 1);
      } catch (e) {
        console.log(e.message);
      }
    },

    async updateData(event) {
      try {
        await this.$axios.put(`${this.dataUrl}/${event.id}`, event.content);
        this.jsonData.splice(event.index, 1, event.content);
      } catch (e) {
        console.log(e.message);
      }
    },
  },
};
</script>

<style>
#app {
  min-height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  background: linear-gradient(135deg, #4124a4, #e6509d);
  line-height: 1.3;
}

.mx-auto {
  margin-right: auto;
  margin-left: auto;
}

.container {
  max-width: 1200px;
  box-sizing: border-box;
}

.grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 15px 15px;
}

.nav {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
}

.main {
  padding-top: 15px;
}

/* hd */

/* add */
.add__Btn {
  padding: 3px 15px;
  font-size: 24px;
  border: none;
  border-radius: 3px;
  background-color: rgba(255, 255, 255, 0.74);
  cursor: pointer;
}
/* filter */
.filter__input {
  height: 100%;
  padding: 3px 15px;
  background-color: rgba(255, 255, 255, 0.274);
  border: none;
  border-radius: 3px;
  outline: none;
}

.filter__input::placeholder {
  font-size: 16px;
  color: rgba(245, 241, 240, 0.842);
}
</style>
