## Flatten Array Challenge

### How to run

 1. `git clone`
 2. `npm install`
 3. `npm run test`

### Implementation details

 - The main entrypoint is the `flatten` function call
	 - this makes some initial checks and then calls a helper function
- Two helper implementations are provided
	- a simple recursive implementation `flattenHelper`-
		- this is more simple, but has a hard limit of 10k for the nesting depth
		- this is because of the JS engine max allowed recursion depth
		- tail call optimization is JS engine-specific so we cannot rely on that
	- an iterative implementation `flattenHelperIterative`
		- the "recursion" is explicitly done by using a stack for keeping track of the current context
		- the 10k nesting depth limit is removed
		- tests do actually check if the implementation has the nesting depth hard limit - this implementation passes
