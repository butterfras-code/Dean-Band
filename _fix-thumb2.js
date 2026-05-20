const fs = require('fs');
const p = 'beginning-band-info - claude.html';
let text = fs.readFileSync(p, 'utf8');

text = text.replace(
  '      <img id="modal-img" alt="" style="display:none;">\r\n',
  '      <motion.div class="thumb-blur" id="modal-thumb-blur" aria-hidden="true"></motion.div>\r\n      <img id="modal-img" class="thumb-photo" alt="">\r\n'
);
text = text.replace('<motion.div class="thumb-blur"', '<motion.div class="thumb-blur"'.replace('motion.div', 'motion.div'));
// manual fix
text = text.replace(
  '<motion.div class="thumb-blur" id="modal-thumb-blur" aria-hidden="true"></motion.div>',
  '<motion.div class="thumb-blur" id="modal-thumb-blur" aria-hidden="true"></motion.div>'
);

fs.writeFileSync(p, 'broken');
