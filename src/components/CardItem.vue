<template>
  <div class="post">
    <div class="post__hd">
      <div class="post__avatar">
        <div class="post__userImg">
          <font-awesome-icon icon="user" />
        </div>
        <p class="post__name">{{ parentData.author }}</p>
      </div>
      <div v-if="isEditMode === false" class="post__controller">
        <button
          class="post__btn post__btn--peace"
          type="button"
          @click="clickSwitchEdit()"
        >
          <font-awesome-icon icon="gear" />
        </button>
        <button class="post__btn" type="button" @click="clickToDelete()">
          <font-awesome-icon icon="trash-can" />
        </button>
      </div>
    </div>
    <div v-if="isEditMode === false" class="post__wrapper">
      <div class="post__content">
        <h2 class="post__title">{{ parentData.title }}</h2>
        <p class="post__text">{{ parentData.content }}</p>
      </div>
      <div class="post__date">
        <div class="post__timeIcon">
          <font-awesome-icon icon="clock" />
        </div>
        <p class="post__time">{{ getCurTime(parentData.time) }}</p>
      </div>
    </div>
    <div v-else class="edit">
      <div class="edit__inputWrapper">
        <label class="edit__label" for="edit__input">
          作者:
          <input class="edit__input" v-model="editData.author" type="text" />
        </label>
      </div>
      <div class="edit__inputWrapper">
        <label class="edit__label" for="edit__input">
          標題:
          <input class="edit__input" v-model="editData.title" type="text" />
        </label>
      </div>
      <div class="edit__inputWrapper">
        <label class="edit__label" for="edit__input">
          內容:
          <textarea
            class="edit__input edit__input--content"
            v-model="editData.content"
          />
        </label>
      </div>
      <div class="post__date">
        <div class="post__timeIcon">
          <font-awesome-icon icon="clock" />
        </div>
        <p class="post__time">{{ getCurTime(parentData.time) }}</p>
      </div>
      <div class="edit__controller">
        <button
          class="edit__btn edit__btn--peace"
          type="button"
          @click="clickToUpdate()"
          :disabled="isBtn"
        >
          確定
        </button>
        <button class="edit__btn" type="button" @click="cancelEdit()">
          取消
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CardItem',
  props: {
    parentData: {
      type: Object,
      default: () => {},
    },
    parentIndex: {
      type: Number,
    },
  },

  created() {
    this.editData = { ...this.parentData };
  },

  data() {
    return {
      isEditMode: false,
      editData: {},
      isBtn: false,
    };
  },

  computed: {
    isBtnDisable() {
      return this.objEqual(this.parentData, this.editData);
    },

    isBtnC() {
      const editCData = this.editData;
      return editCData;
    },
  },

  watch: {
    isBtnC(newVal) {
      console.log(newVal);
    },
  },

  methods: {
    clickSwitchEdit() {
      this.editData.time = this.parentData.time;
      this.isEditMode = !this.isEditMode;
    },

    cancelEdit() {
      this.editData = { ...this.parentData };
      this.clickSwitchEdit();
    },

    clickToDelete() {
      this.$emit('delete', { id: this.parentData.id, index: this.parentIndex });
    },

    async clickToUpdate() {
      const date = Date.now();
      const config = { ...this.editData };
      Object.assign(config, { time: date });
      await this.$emit('update', {
        id: this.parentData.id,
        content: config,
        index: this.parentIndex,
      });
      this.clickSwitchEdit();
    },

    getCurTime(time) {
      const date = new Date(time);
      const year = date.getFullYear();
      const month = date.getMonth() + 1;
      const day = date.getDate();
      const hours = date.getHours();
      const minutes = date.getMinutes();
      const sec = date.getSeconds();
      return `${year}-${month}-${day} ${hours}:${minutes}:${sec}`;
    },

    objEqual(obj1, obj2) {
      const keys1 = Object.keys(obj1);
      const keys2 = Object.keys(obj2);

      if (keys1.length !== keys2.length) {
        return false;
      }

      for (let index = 0; index < keys1.length; index += 1) {
        const val1 = obj1[keys1[index]];
        const val2 = obj2[keys2[index]];
        if (val1 !== val2) {
          return false;
        }
      }
      return true;
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.post {
  padding: 15px;
  background-color: #eaebee;
  border-radius: 5px;
}

.post__hd {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-right: 5px;
  color: #989898;
}

.post__avatar {
  display: flex;
  align-items: center;
}

.post__userImg {
  width: 30px;
  height: 30px;
  line-height: 30px;
  margin-right: 10px;
  color: #f38c9b;
  text-align: center;
  background-color: #ffbec9;
  border-radius: 50%;
}

.post__img {
  width: 100%;
  border-radius: 50%;
  vertical-align: middle;
}

.post__name {
  font-size: 20px;
}

.post__btn {
  padding: 0;
  font-size: 18px;
  color: #989898;
  border: none;
  cursor: pointer;
}

.post__btn + .post__btn {
  margin-left: 18px;
}

.post__btn--peace {
  color: #00c0dd;
}

.post__content {
  margin-top: 15px;
  padding: 10px 15px;
  font-size: 16px;
  color: #666666;
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0px 1px 0px 0px rgb(163, 162, 162);
}

.post__title {
  font-size: 20px;
  font-weight: 600;
}

.post__text {
  padding-top: 5px;
  line-height: 1.6;
}

.post__date {
  margin-top: 10px;
  font-size: 14px;
  display: flex;
  color: #a9a8a9;
}

.post__timeIcon {
  margin-right: 10px;
}

.edit {
  margin-top: 15px;
}

.edit__label {
  box-sizing: border-box;
  font-size: 12px;
}

.edit__input {
  width: 100%;
  padding: 8px 10px;
  margin-top: 3px;
  font-size: 16px;
  border: solid 2px #dcdcdc;
  box-sizing: border-box;
}

.edit__input--content {
  height: 120px;
}

.edit__inputWrapper {
  margin-top: 5px;
}

.edit__controller {
  margin-top: 10px;
  text-align: center;
}

.edit__btn {
  padding: 8px 15px;
  border: none;
  font-size: 16px;
  color: #666666;
  background-color: #dadada;
  border-radius: 3px;
  cursor: pointer;
}

.edit__btn:disabled {
  background-color: #76d7e8;
}

.edit__btn + .edit__btn {
  margin-left: 10px;
}

.edit__btn--peace {
  color: #fff;
  background-color: #43c6dd;
}
</style>
