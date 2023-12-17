<template>
    <div class="row">
        <div class="col-md-8">
            <div class="card mb-2">
                <div class="card-body">
                    <input
                        type="text"
                        class="form-control"
                        placeholder="ຄົ້ນຫາ..."
                        v-model="Search"
                        @key.enter="GetStore()"
                    />
                </div>
            </div>
            <div class="row">
                <div
                    class="col-md-3"
                    v-for="list in StoreData.data"
                    :key="list.id"
                >
                    <div class="card mb-3">
                        <img
                            :src="url + '/assets/img/' + list.image"
                            v-if="list.image"
                            class="card-img-top img-post"
                            alt=""
                        />
                        <img
                            :src="url + '/assets/img/image_pre.jpg'"
                            v-else
                            class="card-img-top img-post"
                            alt=""
                        />
                        <div class="card-body pt-1 text-center">
                            {{ list.name }}
                            <p class="card-text">
                                {{ formatPrice(list.price_sell) }} ກີບ
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="col-md-4">BBB</div>
    </div>
</template>

<script>
import axios from "axios";
import { useStore } from "../store/auth";

export default {
    name: "Minipos13POS",
    setup() {
        const store = useStore();
        return { store };
    },

    data() {
        return {
            url: window.location.origin,
            Sort: "asc",
            PerPage: "30",
            Search: "",
            StoreData: [],
        };
    },

    mounted() {},

    methods: {
        formatPrice(value) {
            let val = (value / 1).toFixed(0).replace(",", ".");
            return val.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
        },
        GetStore(page) {
            axios
                .get(
                    `api/store?page=${page}&sort=${this.Sort}&perpage=${this.PerPage}&search=${this.Search}`,
                    {
                        headers: {
                            Authorization: "Bearer" + this.store.get_token,
                        },
                    }
                )
                .then((res) => {
                    this.StoreData = res.data;
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
    created() {
        this.GetStore();
    },
    watch: {
        Search() {
            if (this.Search == "") {
                this.GetStore();
            }
        },
    },
};
</script>

<style scoped>
.img-post {
    width: 100%;
    height: 125px;
    object-fit: cover;
    object-position: center;
}
</style>
