<template>
  <v-footer class="footer">
    <v-card class="footer_card" color="#97978f" flat tile>
      <v-card-text>
        <v-btn
          icon
          height="auto"
          width="auto"
          class="footer_icon"
          href="https://www.linkedin.com/in/maryna-lavrentieva-3323a31b2/"
          target="_blank"
          ><img class="footer_img" src="@/static/icons/linkedin.png" />
        </v-btn>
        <v-btn
          icon
          height="auto"
          width="auto"
          class="footer_icon"
          href="https://www.facebook.com/lavrenderg"
          target="_blank"
          ><img class="footer_img" src="@/static/icons/facebook.png" />
        </v-btn>
        <v-btn icon height="auto" width="auto" class="footer_icon" href="mailto:m.larender@gmail.com"
          ><img class="footer_img" src="@/static/icons/gmail.png" />
        </v-btn>
      </v-card-text>
      <v-card-text class="footer_text"
        >Phasellus feugiat arcu sapien, et iaculis ipsum elementum sit amet. Mauris cursus commodo interdum. Praesent ut
        risus eget metus luctus accumsan id ultrices nunc. Sed at orci sed massa consectetur dignissim a sit amet dui.
        Duis commodo vitae velit et faucibus. Morbi vehicula lacinia malesuada. Nulla placerat augue vel ipsum ultrices,
        cursus iaculis dui sollicitudin. Vestibulum eu ipsum vel diam elementum tempor vel ut orci. Orci varius natoque
        penatibus et magnis dis parturient montes, nascetur ridiculus mus.
      </v-card-text>
      <v-divider />
      <v-card-text> {{ new Date().getFullYear() }} — <strong>Lavrender</strong> </v-card-text>
    </v-card>
  </v-footer>
</template>