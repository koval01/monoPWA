<script>
    import {
      Page,
      Navbar,
      BlockTitle,
      List,
      ListItem,
      Radio,
      Toggle,
      Link,
      Popover,
    } from 'konsta/svelte';
  </script>
  
  <Page>
    <Navbar title="MonoPWA" large transparent centerTitle />
  
    <BlockTitle>Theme</BlockTitle>
    <List strong inset>
      <ListItem label title="iOS Theme">
        <Radio
          slot="media"
          onChange={() => null}
          component="div"
          checked={true}
        />
      </ListItem>
      <ListItem label title="Material Theme">
        <Radio
          slot="media"
          onChange={() => null}
          component="div"
          checked={false}
        />
      </ListItem>
    </List>
    <List strong inset>
      <ListItem title="Dark Mode" label>
        <Toggle
          slot="after"
          component="div"
          onChange={() => null}
          checked={false}
        />
      </ListItem>
  
      <ListItem
        title="Color Theme"
        link
        onClick={() => null}
      >
        <div
          slot="after"
          class="w-6 h-6 rounded-full bg-primary home-color-picker"
        />
      </ListItem>
    </List>
    <Popover
      opened={false}
      onBackdropClick={() => null}
      size="w-36"
      target=".home-color-picker"
    >
      <div class="grid grid-cols-3 py-2">
        <Link
          touchRipple
          class="overflow-hidden h-12"
          onClick={() => null}
        >
          <span class="bg-brand-primary w-6 h-6 rounded-full" />
        </Link>
        <Link
          touchRipple
          class="overflow-hidden h-12"
          onClick={() => null}
        >
          <span class="bg-brand-red w-6 h-6 rounded-full" />
        </Link>
        <Link
          touchRipple
          class="overflow-hidden h-12"
          onClick={() => null}
        >
          <span class="bg-brand-green w-6 h-6 rounded-full" />
        </Link>
        <Link
          touchRipple
          class="overflow-hidden h-12"
          onClick={() => null}
        >
          <span class="bg-brand-yellow w-6 h-6 rounded-full" />
        </Link>
        <Link
          touchRipple
          class="overflow-hidden h-12"
          onClick={() => null}
        >
          <span class="bg-brand-purple w-6 h-6 rounded-full" />
        </Link>
      </div>
    </Popover>
  
    <BlockTitle>Components</BlockTitle>
    <List strong inset>
        <ListItem link href="/" title="Test">
        </ListItem>
    </List>
  </Page>