import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';


# Test for embedded python visualizer

Tomiikohan tämä jos version julkaisee?

<iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=beatles%20%3D%20%22Paul%20John%20George%20Ringo%22%0Aprint%28%22Paul%22%20in%20beatles%29%0Aprint%28%22John%22%20in%20beatles%29%0Aprint%28%22Pete%20Best%22%20in%20beatles%29%0A%0Aif%20%22Ringo%22%20in%20beatles%3A%0A%20%20%20%20print%28%22Ringo%20too!%22%29%0A%0Aif%20%22Elton%20John%22%20in%20beatles%3A%0A%20%20%20%20print%28%22Are%20you%20sure%3F%22%29&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>

Alla mahdollinen tapa näyttää molemmat vaihtoehdot!

<Tabs>
  <TabItem value="code" label="Normal Code Block" default>
    ```python
    beatles = "Paul John George Ringo"
    print("Paul" in beatles)
    print("John" in beatles)
    print("Pete Best" in beatles)

    if "Ringo" in beatles:
        print("Ringo too!")

    if "Elton John" in beatles:
        print("Are you sure?")
    ```

    Program outputs:

    ```
    True
    True
    False
    Ringo too!
    ```
  </TabItem>
  <TabItem value="visualization" label="Visualization">
    <iframe width="800" height="500" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=beatles%20%3D%20%22Paul%20John%20George%20Ringo%22%0Aprint%28%22Paul%22%20in%20beatles%29%0Aprint%28%22John%22%20in%20beatles%29%0Aprint%28%22Pete%20Best%22%20in%20beatles%29%0A%0Aif%20%22Ringo%22%20in%20beatles%3A%0A%20%20%20%20print%28%22Ringo%20too!%22%29%0A%0Aif%20%22Elton%20John%22%20in%20beatles%3A%0A%20%20%20%20print%28%22Are%20you%20sure%3F%22%29&codeDivHeight=400&codeDivWidth=350&cumulative=false&curInstr=0&heapPrimitives=nevernest&origin=opt-frontend.js&py=3&rawInputLstJSON=%5B%5D&textReferences=false"> </iframe>
  </TabItem>
</Tabs>