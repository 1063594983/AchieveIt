<template>
  <el-autocomplete
    class="search-bar"
    prefix-icon="el-icon-search"
    v-model="searchInput"
    :fetch-suggestions="querySearch"
    placeholder="搜索想要的功能"
    @select="handleSelect"
  >
    <template slot-scope="{ item }">
      <div class="search-result">
        <el-icon :name="item.icon"></el-icon>
        <div>
          <p>{{ item.title }}</p>
          <p class="secondary">{{ item.fatherTitle }}</p>
        </div>
      </div>
    </template>
  </el-autocomplete>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { getFlatMenu } from '@/router';
import fuzzysearch from 'fuzzysearch';
import { userStore } from '@/store';

interface SearchItem {
  title: string;
  icon: string;
  fatherTitle: string;
  name: string;
}

@Component
export default class extends Vue {
  searchInput = '';

  handleSelect(item: SearchItem) {
    this.$router.push({ name: item.name });
  }
  querySearch(queryString: string, cb: (menu: SearchItem[]) => void) {
    const flatMenu = getFlatMenu();
    if (!queryString) {
      cb(flatMenu);
    } else {
      cb(flatMenu.filter((i) => fuzzysearch(queryString, i.fatherTitle + i.title)));
    }
  }
}
</script>

<style scoped lang="scss">
.search-bar {
  margin-right: 20px;
}

.search-result {
  display: flex;
  align-items: center;
  padding: 10px 0;
  i {
    margin-right: 10px;
    font-size: 1.3rem;
  }
  p {
    margin: 0;
    font-weight: bold;
    line-height: 1rem;
  }
  p.secondary {
    font-weight: 400;
    opacity: 0.3;
    font-size: 0.8rem;
  }
}
</style>
