<script>
    // @ts-nocheck

    import { navigate } from "svelte-routing";

    import { Icon, Tabbar, TabbarLink } from "konsta/svelte";

    import Cards from "../icons/Cards.svelte";
    import Currency from "../icons/Currency.svelte";

    import { tabs } from "./tab";

    let activeTab = window.location.pathname;

    const selectTab = (tab = tabs.home) => {
        if (!tab) return;
        navigate(tab, { replace: true });
    };
</script>

<Tabbar class="left-0 bottom-0 fixed p-1" labels={true} icons={true} >
    <TabbarLink active={activeTab === tabs.home} onClick={() => (selectTab(tabs.home))} label='Картки'>
        <svelte:fragment slot="icon">
            <Icon>
                <Cards slot="ios" class="w-7 h-7 transition-all ease-in-out delay-400" />
            </Icon>
        </svelte:fragment>
    </TabbarLink>
    <TabbarLink active={activeTab === tabs.currency} onClick={() => (selectTab(tabs.currency))} label="Валюти">
        <svelte:fragment slot="icon">
            <Icon>
                <Currency class="w-7 h-7 transition-all ease-in-out delay-400" />
            </Icon>
        </svelte:fragment>
    </TabbarLink>
</Tabbar>
