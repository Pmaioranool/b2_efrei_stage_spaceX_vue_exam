import { ref, computed, reactive} from "vue";
import axios from "axios";

interface ConfigInterface {
  skip?: boolean;
}


export const useFetch = (url: string, config: ConfigInterface = { skip: false }) => {
  const data = ref<any>(null);
  const response = ref<any>(null);
  const error = ref<any>(null);
  const loading = ref(false);

  const fetch = async () => {
    loading.value = true;
    try {
      const result = await axios.request({
        url,
        ...config,
      });
      response.value = result;
      data.value = result.data;
    } catch (ex) {
      error.value = ex;
    } finally {
      loading.value = false;
    }
  };

  if (!config.skip) fetch();

  return { response, data, error, loading, fetch };
};

const cacheMap = reactive(new Map());

export const useFetchCache = (key: string, url: string, config: ConfigInterface)=> {
  const info = useFetch(url, { skip: true, ...config });

  const update = () => cacheMap.set(key, info.response.value);
  const clear = () => cacheMap.set(key, undefined);

  const fetch = async () => {
    try {
      await info.fetch();
      update();
    } catch {
      clear();
    }
  };

  const response = computed(() => cacheMap.get(key));
  const data = computed(() => response.value?.data ?? null);

  if (response.value == null) {
    fetch();
  }

  return { ...info, fetch, data, response, clear };
};