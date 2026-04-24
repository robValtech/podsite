export type BaseComponentProps = {
  /**
   * id attribute applied to the most outer wrapper of the component
   */
  id?: string;
  /**
   * className applied to the most outer wrapper of the component for styling
   * customisation and overrides
   */
  className?: string;
  /**
   * data-testid attribute applied to the most outer wrapper component used for
   * e2e testing
   */
  dataTestId?: string;
};
