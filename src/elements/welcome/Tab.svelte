<script>
    // @ts-nocheck

    import { Icon, Tabbar, TabbarLink } from "konsta/svelte";

    import Cards from "../icons/Cards.svelte";
    import Currency from "../icons/Currency.svelte";

    const tabs = {
        home: "/", currency: "/currency"
    };
    let activeTab = window.location.pathname;

    const selectTab = (tab = null) => {
        return; // curently disabled

        if (!tab) return;
        window.location.pathname = tab;
        activeTab = tab;
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
    <TabbarLink active={activeTab === tabs.currency} onClick={selectTab(tabs.currency)} label="Валюти">
        <svelte:fragment slot="icon">
            <Icon>
                <Currency class="w-7 h-7 transition-all ease-in-out delay-400" />
            </Icon>
        </svelte:fragment>
    </TabbarLink>
</Tabbar>
