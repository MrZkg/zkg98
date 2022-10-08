<template>
  <div class="layout">
    <el-header>
      <div class="sys_title">zkg98管理系统</div>
    </el-header>
    <el-container :class="device === 'mobile' ? 'mobile_container' : ''">
      <el-menu
        v-if="device === 'mobile'"
        mode="horizontal"
        :default-active="$route.path"
        class="el-menu-demo"
        @open="handleOpen"
        @close="handleClose"
        background-color="#545c64"
        text-color="#fff"
        active-text-color="#ffd04b"
        router
        :collapse="isCollapse"
      >
        <div class="collapse" @click="changeCollapse" v-if="device === 'pc'">
          | | |
        </div>
        <template v-for="item in menuList">
          <template v-if="item.children && item.children[0]">
            <el-submenu
              :index="item.path"
              background-color="#3d7dbd"
              :key="item.id"
            >
              <template slot="title">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </template>
              <el-menu-item
                v-for="(subItem, i) in item.children"
                :key="i"
                :index="subItem.path"
              >
                {{ subItem.name }}
              </el-menu-item>
            </el-submenu>
          </template>
          <template v-else>
            <el-menu-item :index="item.path" :key="item.id">
              <i :class="item.icon"></i>
              <span slot="title">{{ item.name }}</span>
            </el-menu-item>
          </template>
        </template>
      </el-menu>
      <el-aside :width="isCollapse ? '' : '200px'" v-if="device === 'pc'">
        <el-menu
          mode="vertical"
          :default-active="$route.path"
          class="el-menu-vertical-demo"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          router
          :collapse="isCollapse"
        >
          <div class="collapse" @click="changeCollapse">| | |</div>
          <template v-for="item in menuList">
            <template v-if="item.children && item.children[0]">
              <el-submenu
                :index="item.path"
                background-color="#3d7dbd"
                :key="item.id"
              >
                <template slot="title">
                  <i :class="item.icon"></i>
                  <span slot="title">{{ item.name }}</span>
                </template>
                <el-menu-item
                  v-for="(subItem, i) in item.children"
                  :key="i"
                  :index="subItem.path"
                >
                  {{ subItem.name }}
                </el-menu-item>
              </el-submenu>
            </template>
            <template v-else>
              <el-menu-item :index="item.path" :key="item.id">
                <i :class="item.icon"></i>
                <span slot="title">{{ item.name }}</span>
              </el-menu-item>
            </template>
          </template>
        </el-menu>
      </el-aside>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import { getDeviceType } from "../../../utils/getDeviceType";
import { mapState, mapGetters } from "vuex";
export default {
  computed: {
    ...mapState(["device"]),
    ...mapState(["isCollapse"]),
  },
  data() {
    return {
      menuList: [
        {
          id: "1",
          name: "用户管理",
          path: "/userMgt",
          children: null,
          icon: "el-icon-s-custom",
        },
        {
          id: "2",
          name: "菜单管理",
          path: "/menuMgt",
          children: null,
          icon: "el-icon-menu",
        },
        {
          id: "3",
          name: "其他",
          path: "/otherMgt",
          icon: "el-icon-date",
          children: [
            {
              id: "3-1",
              name: "3-1",
            },
            {
              id: "3-2",
              name: "3-2",
            },
          ],
        },
      ],
    };
  },
  created() {
    // console.log(11111, navigator);
    let self = this;
    this.getDeviceType();
    window.onresize = function () {
      self.getDeviceType();
    };
  },
  methods: {
    getDeviceType() {
      let device = getDeviceType();
      this.$store.commit("setDevice", device);
    },
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
    },
    handleSelect(key, keyPath) {
      // this.menuList[0].subs.forEach((item) => {
      //   if (key === item.id) {
      //     this.handleCommand(item.type);
      //   }
      // });
    },
    changeCollapse() {
      this.$store.commit("setIsCollapse", !this.isCollapse);
    },
  },
};
</script>

<style lang="scss" scoped>
.layout {
  display: flex;
  flex-direction: column;
  height: 100%;
}
.el-container {
  flex: 1;
}
.el-header,
.el-footer {
  background-color: #b3c0d1;
  color: #333;
  text-align: center;
  line-height: 60px;
}

.el-aside {
  background-color: #d3dce6;
  color: #333;
  text-align: center;
  /deep/.el-menu {
    height: 100%;
    overflow: hidden;
  }
}

.el-main {
  background-color: #e9eef3;
  color: #333;
  text-align: center;
}
.collapse {
  line-height: 40px;
  background: rgb(67, 74, 80);
  color: #fff;
  cursor: pointer;
}
.sys_title {
  font-size: 24px;
}

.mobile_container {
  display: flex;
  flex-direction: column;
  .el-menu--horizontal > .el-menu-item {
    border-bottom: none;
  }
  .el-menu--horizontal > .el-menu-item.is-active {
    border-bottom: none;
  }
}
</style>
